
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@ApiBearerAuth()
@Controller('users')

export class UserController {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  @Get('me')
  async getMe(@Req() req: Request & { user: any }) {

    const userId = req.user.id;
    return await this.userRepository.find();
  }

  @Get()
  async getUsers() {
    return await this.userRepository.find();
  }

  @Get('profile')
  async getProfile(@Req() req: Request & { user: any }) {
    const userId = req.user.id;
    return await this.userRepository.findOne(userId);
  }

  @Get('profile/:id')
  async getProfileById(@Req() req: Request & { user: any }) {
    const userId = req.user.id;
    return await this.userRepository.findOne(userId);
  }

  @Post()
  async createUser() {
    return await this.userRepository.create();
  }
}
