import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { RoomModel } from '../entities/room.schema';
import { MessageModel } from '../entities/message.schema';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { MessageDto } from '../dtos/chat.dto';

@WebSocketGateway()
export class ChatWebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;

    async handleConnection(socket: Socket): Promise<void> {
        console.log(`User connected: ${socket.id}`);
    }

    async handleDisconnect(socket: Socket): Promise<void> {
        console.log(`User disconnected: ${socket.id}`);
    }

    // Event: chat:join
    @SubscribeMessage('chat:join')
    async handleJoin(socket: Socket, roomId: string): Promise<void> {
        const room = await RoomModel.get({ roomId });
        if (!room) {
            throw new NotFoundException(`Room with ID '${roomId}' not found`);
        }
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    }

    // Event: chat:leave
    @SubscribeMessage('chat:leave')
    async handleLeave(socket: Socket, roomId: string): Promise<void> {
        socket.leave(roomId);
        console.log(`User left room: ${roomId}`);
    }

    // Event: message:sent
    @SubscribeMessage('message:sent')
    async handleMessage(socket: Socket, messageDto: MessageDto): Promise<void> {
        const room = await RoomModel.get({ roomId: messageDto.chatId });
        if (!room) {
            throw new NotFoundException(`Room with ID '${messageDto.chatId}' not found`);
        }

        const newMessage = new MessageModel({
            chatId: messageDto.chatId,
            senderId: socket.id,
            content: messageDto.content,
            contentType: messageDto.contentType,
            sentAt: new Date(),
        });

        await newMessage.save();

        // Emit to chat participants
        this.server.to(messageDto.chatId).emit('message:received', newMessage);
    }
}
