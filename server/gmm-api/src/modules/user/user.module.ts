import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [UserService],
      exports: [TypeOrmModule, UserService],
})

export class UserModule {}

export enum EMAIL_LISTS_ID {
  All_Registered_Users = 'All Users',
}
