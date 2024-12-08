import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { DynamooseModule } from '@modules/dynamo/dynamo.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ChatWebsocketGateway } from './services/chat.websocket.gateway';

@Module({
  imports: [UserModule, AuthModule, DynamooseModule],
  providers: [ChatService, ChatWebsocketGateway],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
