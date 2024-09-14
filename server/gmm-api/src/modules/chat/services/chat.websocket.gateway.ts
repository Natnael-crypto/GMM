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
import { UserService } from '@modules/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@WebSocketGateway({
    transports: ['websocket', 'polling'],
    cors: {origin: '*'}
})
export class ChatWebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    @WebSocketServer() server;
    
    async validateUser(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token, { secret: this.configService.get('JWTSECRET') });
    
            const user = await this.userService.getUserById(decoded.userId);
            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            console.error('Invalid token or user not found', error);
            throw new Error('Invalid token or user not found');
        }
    }
    


    async handleConnection(socket: Socket): Promise<void> {
        const headers = socket.handshake.headers;
        console.log(headers)
    
        const authHeader = headers.authorization;
    
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]; 
    
            try {
                const user = await this.validateUser(token);
                socket.data.userId = user.id;
                console.log(`User connected: ${user.id}`);
            } catch (error) {
                console.error('User validation failed:', error.message);
                socket.disconnect();
            }
        } else {
            console.log('No token provided or invalid format, disconnecting socket');
            socket.disconnect();
        }
    
        const customHeader = headers['custom-header-1'];
        if (customHeader) {
            console.log('Custom Header 1:', customHeader);
        }
    }
    

    async handleDisconnect(socket: Socket): Promise<void> {
        console.log(`User disconnected: ${socket.id}`);
    }

    @SubscribeMessage('chat:join')
    async handleJoin(socket: Socket, roomId: string): Promise<void> {
        const room = await RoomModel.get({ roomId });
        if (!room) {
            throw new NotFoundException(`Room with ID '${roomId}' not found`);
        }
        
        const isAllowed = await this.checkUserAccess(socket.data.userId, room);
        if (!isAllowed) {
            throw new ForbiddenException('Access denied to this chat room');
        }

        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
    }

    @SubscribeMessage('chat:leave')
    async handleLeave(socket: Socket, roomId: string): Promise<void> {
        socket.leave(roomId);
        console.log(`User ${socket.id} left room: ${roomId}`);
    }

    @SubscribeMessage('message:sent')
    async handleMessage(socket: Socket, messageDto: MessageDto): Promise<void> {
        const room = await RoomModel.get({ roomId: messageDto.roomId });
        console.log(room)
        if (!room) {
            throw new NotFoundException(`Room with ID '${messageDto.roomId}' not found`);
        }
        console.log(messageDto)

        const newMessage = new MessageModel({
            id: randomUUID().toString(),
            roomId: messageDto.roomId,
            senderId: socket.id,
            content: messageDto.content,
            contentType: messageDto.contentType,
            sentAt: new Date(),
        });

        await newMessage.save();

        this.server.to(messageDto.roomId).emit('message:received', newMessage);
    }

    private async checkUserAccess(userId: string, room: any): Promise<boolean> {
        return room.user1 === userId || room.user2 === userId;
    }
}