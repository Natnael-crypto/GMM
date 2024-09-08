import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

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
    
        // Map the rooms to ChatDto
        return rooms.map((room: any) => ({
            id: room.roomId,
            user1: room.user1,
            user2: room.user2,
        }));
    }
    

    async createChat(initiateChatDto: InitiateChatDto): Promise<ChatDto> {
        const { userId } = initiateChatDto;
        const user = await this.userService.getUserById(userId);

        if (!user) {
            throw new NotFoundException(`User with ID '${userId}' not found`);
        }
    
        const user1 = userId;
        const user2 = 'placeholder_user'; 
    
        const room = new RoomModel({
            
            roomId: randomUUID(),
            user1,
            user2,
            createdDate: new Date(),
        });
    
        await room.save();
    
        // Return the room mapped to ChatDto
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
    
        // Map the room to a ChatDto
        return {
            id: room.roomId,
            user1: room.user1, 
            user2: room.user2, 
        };
    }
    

    // Get messages within a room
    async getMessages(roomId: string, fromIndex: number, toIndex: number): Promise<MessageDto[]> {
        const room = await RoomModel.get({ roomId });
        if (!room) {
            throw new NotFoundException(`Room with ID '${roomId}' not found`);
        }
    
        const messages = await MessageModel.query('roomId').eq(roomId).exec();
        
        // Filter and map the messages
        return messages
            .filter((_, index) => index >= fromIndex - 1 && index < toIndex)
            .map(toMessageDto);
    }
}


export function toMessageDto(message: any): MessageDto {
    return {
        id: message.id,
        chatId: message.chatId,
        senderId: message.senderId,
        content: message.content,
        contentType: message.contentType,
        sentAt: message.sentAt,
    };
}

