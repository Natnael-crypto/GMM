import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { RoomModel } from '../entities/room.schema';
import { MessageModel } from '../entities/message.schema';
import { ChatDto, InitiateChatDto, MessageDto } from '../dtos/chat.dto';
import { randomUUID } from 'crypto';
import { User } from '@modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { decryptText, encryptText } from '@shared/utils/crypt';
import { ConfigService } from '@nestjs/config';
import { ChatEncryptionConfig } from '@shared/config';

@Injectable()
export class ChatService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(userId: string): Promise<User> {
    if (!userId) {
      throw new NotFoundException('User ID not provided');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID '${userId}' not found`);
    }

    return user;
  }

  async getUserChats(userId: string): Promise<ChatDto[]> {
    const rooms = await RoomModel.scan().exec();

    return rooms
      .map((room: any) => ({
        id: room.roomId,
        user1: room.user1,
        user2: room.user2,
      }))
      .filter((room: any) => room.user1 === userId || room.user2 === userId);
  }

  async createChat(
    initiateChatDto: InitiateChatDto,
    user: any,
  ): Promise<ChatDto> {
    const { userId } = initiateChatDto;

    const user1 = await this.getUserById(userId);

    if (!user1 || !user) {
      throw new NotFoundException('One or both users not found');
    }

    const existingRoom = await RoomModel.scan()
      .where('user1')
      .eq(userId)
      .where('user2')
      .eq(user.id)
      .or()
      .where('user1')
      .eq(user.id)
      .where('user2')
      .eq(userId)
      .exec();

    if (existingRoom.length > 0) {
      throw new ConflictException('Chat room already exists');
    }

    const room = new RoomModel({
      roomId: randomUUID(),
      user1: userId,
      user2: user.id,
      createdDate: new Date(),
    });

    await room.save();

    return {
      id: room.roomId,
      user1: room.user1,
      user2: room.user2,
    };
  }

  async getChatById(roomId: string): Promise<ChatDto> {
    const room = await RoomModel.get({ roomId });
    if (!room) {
      throw new NotFoundException(`Room with ID '${roomId}' not found`);
    }

    return {
      id: room.roomId,
      user1: room.user1,
      user2: room.user2,
    };
  }

  async getMessages(
    roomId: string,
    options?: {
      lastKey?: { id: string; roomId: string; sentAt: number };
      limit?: number;
    },
  ): Promise<any> {
    const room = await RoomModel.get({ roomId });
    if (!room) {
      throw new NotFoundException(`Room with ID '${roomId}' not found`);
    }

    let messages;

    if (options?.lastKey) {
      messages = await MessageModel.query('roomId')
        .eq(roomId)
        .sort('descending')
        .startAt(options.lastKey)
        .limit(options?.limit || 10)
        .exec();
    } else {
      messages = await MessageModel.query('roomId')
        .eq(roomId)
        .sort('descending')
        .limit(options?.limit || 10)
        .exec();
    }

    const encryptionKey =
      this.configService.get<ChatEncryptionConfig>('chat')!.key;

    // Decrypt the message content
    const decryptedMessages = messages.map((message: any) => ({
      ...message,
      content: decryptText(message.content, encryptionKey),
    }));

    return {
      messages: decryptedMessages.map((message: any) => toMessageDto(message)),
      lastKey: messages.lastKey,
    };
  }

  async saveMessage(messageDto): Promise<MessageDto> {
    const room = await RoomModel.get({ roomId: messageDto.roomId });
    if (!room) {
      throw new NotFoundException(
        `Room with ID '${messageDto.roomId}' not found`,
      );
    }

    const encryptionKey =
      this.configService.get<ChatEncryptionConfig>('chat')!.key;
    const encryptedContent = encryptText(messageDto.content, encryptionKey);

    messageDto.content = encryptedContent;

    const newMessage = new MessageModel({
      ...messageDto,
      id: randomUUID().toString(),
      sentAt: new Date(),
    });

    await newMessage.save();

    return toMessageDto(newMessage);
  }
}

export function toMessageDto(message: any): MessageDto {
  return {
    id: message.id,
    roomId: message.chatId,
    senderId: message.senderId,
    content: message.content,
    contentType: message.contentType,
    sentAt: message.sentAt,
  };
}
