import { Injectable, NotFoundException, ConflictException, Req } from '@nestjs/common';

import { RoomModel } from '../entities/room.schema';
import { MessageModel } from '../entities/message.schema';
import { ChatDto, InitiateChatDto, MessageDto } from '../dtos/chat.dto';
import { UserService } from '@modules/user/services/user.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ChatService {
    
    constructor(private userService: UserService) {}

    async getAllChats(): Promise<ChatDto[]> {
        const rooms = await RoomModel.scan().exec(); // Fetch all rooms from DB
    
        return rooms.map((room: any) => ({
            id: room.roomId,
            user1: room.user1,
            user2: room.user2,
        }));
    }

    async createChat(initiateChatDto: InitiateChatDto, user: any): Promise<ChatDto> {
        const { userId } = initiateChatDto;

        const user1 = await this.userService.getUserById(userId);
    

        if (!user1 || !user) {
            throw new NotFoundException('One or both users not found');
        }

        const existingRoom = await RoomModel.scan()
            .where('user1').eq(userId)
            .where('user2').eq(user.id)
            .or()
            .where('user1').eq(user.id)
            .where('user2').eq(userId)
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

    async getMessages(roomId: string, fromIndex: number, toIndex: number): Promise<MessageDto[]> {
        const room = await RoomModel.get({ roomId });
        if (!room) {
            throw new NotFoundException(`Room with ID '${roomId}' not found`);
        }
    
        const messages = await MessageModel.query('roomId').eq(roomId).exec();
        
        return messages
            .filter((_, index) => index >= fromIndex - 1 && index < toIndex)
            .map(toMessageDto);
    }

    async sendMessage(chatId: string, senderId: string, content: string, contentType: string): Promise<MessageDto> {
        const room = await RoomModel.get({ roomId: chatId });
        if (!room) {
            throw new NotFoundException(`Room with ID '${chatId}' not found`);
        }

        const newMessage = new MessageModel({
            chatId,
            senderId,
            content,
            contentType,
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
