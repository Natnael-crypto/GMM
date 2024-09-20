import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { InitiateChatDto, MessageDto, ChatDto } from '../dtos/chat.dto';
import { ApiVersion } from '@shared/types/version';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('chats')
@Controller({ version: ApiVersion.V1, path: 'chats' })
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getUserChats(
    @Req() req: any,
  ): Promise<{ message: string; data: ChatDto[] }> {
    const chats = await this.chatService.getUserChats(req.user);
    return { message: 'Chats retrieved successfully', data: chats };
  }

  @Post()
  @HttpCode(201)
  async initiateChat(
    @Body() initiateChatDto: InitiateChatDto,
    @Req() req: Request,
  ): Promise<{ message: string; data: ChatDto }> {
    const chat = await this.chatService.createChat(
      initiateChatDto,
      (req as unknown as any).user,
    );
    return { message: 'Chat initiated successfully', data: chat };
  }

  @Get('/:id')
  async getChatById(
    @Param('id') id: string,
  ): Promise<{ message: string; data: ChatDto }> {
    const chat = await this.chatService.getChatById(id);
    return { message: 'Chat retrieved successfully', data: chat };
  }

  @Get('/:id/messages')
  @ApiQuery({
    name: 'lastId',
    required: false,
    type: String,
    description: 'The last key of the last message retrieved',
  })
  @ApiQuery({
    name: 'lastSentAt',
    required: false,
    type: Number,
    description: 'The timestamp of the last message retrieved',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'The maximum number of messages to retrieve',
  })
  async getChatMessages(
    @Param('id') chatId: string,
    @Query('lastId') lastId?: string,
    @Query('lastSentAt') lastSentAt?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
  ): Promise<{
    message: string;
    data: {
      messages: MessageDto[];
      lastKey: { id: string; roomId: string; sentAt: number } | null;
    };
  }> {
    let lastKey: any = undefined;
    if (lastId && lastSentAt) {
      lastKey = { id: lastId, roomId: chatId, sentAt: lastSentAt };
    }
    const response = await this.chatService.getMessages(chatId, {
      lastKey,
      limit,
    });
    return { message: 'Messages retrieved successfully', data: response };
  }
}
