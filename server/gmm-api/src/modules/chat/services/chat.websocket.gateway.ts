import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { RoomModel } from '../entities/room.schema';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { MessageDto } from '../dtos/chat.dto';
import { UserService } from '@modules/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Or specify allowed origins
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatWebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer() server: Socket;

  async validateUser(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get('JWTSECRET'),
      });

      const user = await this.userService.getUserById(decoded.id);
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
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    console.log(`User disconnected: ${socket.id}`);
  }

  @SubscribeMessage('chat:join')
  async handleJoin(
    socket: Socket,
    { roomId }: { roomId: string },
  ): Promise<void> {
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
    const newMessage = await this.chatService.saveMessage({
      ...messageDto,
      senderId: socket.data.userId,
    });

    socket.to(messageDto.roomId).emit('message:received', newMessage);
    socket.emit('message:delivered', newMessage);
  }

  private async checkUserAccess(userId: string, room: any): Promise<boolean> {
    return room.user1 === userId || room.user2 === userId;
  }
}
