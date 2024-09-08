import {
    BadRequestException,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Query,
    HttpCode, Post, ForbiddenException, Body
} from "@nestjs/common";
import { ChatService } from "../services/chat.service";
import { InitiateChatDto, MessageDto, ChatDto } from "../dtos/chat.dto";
import { ApiVersion } from "@shared/types/version";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('chats')
@Controller({ version: ApiVersion.V1, path: 'chats' })
export class ChatController {

    constructor(private readonly chatService: ChatService) {}

    
    @Get()
    async getAllChats(): Promise<{ message: string, data: ChatDto[] }> {
        const chats = await this.chatService.getAllChats();
        return { message: 'Chats retrieved successfully', data: chats };
    }

    
    @Post()
    @HttpCode(201)
    async initiateChat(@Body() initiateChatDto: InitiateChatDto): Promise<{ message: string, data: ChatDto }> {
        const chat = await this.chatService.createChat(initiateChatDto);
        return { message: 'Chat initiated successfully', data: chat };
    }

    
    @Get('/:id')
    async getChatById(@Param('id') id: string): Promise<{ message: string, data: ChatDto }> {
        const chat = await this.chatService.getChatById(id);
        return { message: 'Chat retrieved successfully', data: chat };
    }

    
    @Get('/:id/messages')
    async getChatMessages(
        @Param('id') chatId: string,
        @Query('fromIndex', new ParseIntPipe(), new DefaultValuePipe(0)) fromIndex: number,
        @Query('toIndex', new ParseIntPipe(), new DefaultValuePipe(0)) toIndex: number
    ): Promise<{ message: string, data: MessageDto[] }> {
        if (fromIndex <= 0 || toIndex <= 0) {
            throw new BadRequestException('Invalid parameters, "fromIndex" and "toIndex" must be positive');
        }
        if (fromIndex > toIndex) {
            throw new BadRequestException('"toIndex" must not be less than "fromIndex"');
        }

        const messages = await this.chatService.getMessages(chatId, fromIndex, toIndex);
        return { message: 'Messages retrieved successfully', data: messages };
    }
}
