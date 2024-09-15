import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './controllers/chat.controller';
import { DynamooseModule } from '@modules/dynamo/dynamo.module';
import { UserService } from '@modules/user/services/user.service';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  providers: [ChatService, DynamooseModule],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
