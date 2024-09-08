import { UserDto } from '@modules/user/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class ChatDto {
    @ApiProperty({ example: 'chat_123', description: 'The ID of the chat' })
    @IsNotEmpty()
    id: string;

    @ApiProperty({ type: UserDto, description: 'First user in the chat' })
    @IsNotEmpty()
    user1: UserDto;

    @ApiProperty({ type: UserDto, description: 'Second user in the chat' })
    @IsNotEmpty()
    user2: UserDto;
}

export class MessageDto {
    @ApiProperty({ example: 'message_123', description: 'The ID of the message' })
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 'chat_123', description: 'The ID of the chat the message belongs to' })
    @IsNotEmpty()
    chatId: string;

    @ApiProperty({ example: 'user_123', description: 'The ID of the sender of the message' })
    @IsNotEmpty()
    senderId: string;

    @ApiProperty({ example: 'Hello, how are you?', description: 'The content of the message' })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: 'text', description: 'The type of content (e.g., text, image, video)' })
    @IsNotEmpty()
    contentType: string;

    @ApiProperty({ example: '2023-09-06T12:00:00Z', description: 'The timestamp of when the message was sent' })
    @IsNotEmpty()
    sentAt: string; // Assuming ISO string format
}

export class InitiateChatDto {
    @ApiProperty({ example: 'user_123', description: 'The ID of the user initiating the chat' })
    @IsNotEmpty()
    userId: string;
}
