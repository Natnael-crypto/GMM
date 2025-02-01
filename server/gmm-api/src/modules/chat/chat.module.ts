import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { DynamooseModule } from '@modules/dynamo/dynamo.module';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ChatWebsocketGateway } from './services/chat.websocket.gateway';
import { MatchMakingService } from '@modules/matchmaking/services/matchmaking.service';
import { MatchMakingModule } from '@modules/matchmaking/matchmaking.module';

@Module({
  imports: [UserModule, AuthModule, DynamooseModule, MatchMakingModule],
  providers: [ChatService, ChatWebsocketGateway],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
