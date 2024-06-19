import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./controllers/user.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UserController],
      providers: [],
      exports: [TypeOrmModule],
})

export class UserModule {}