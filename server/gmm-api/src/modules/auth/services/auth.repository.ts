import { User } from '@modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@shared/base-repository';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { RegistrationDto } from '../dtos/registration.dto';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class AuthRepository extends BaseRepository {
  constructor(dataSource: DataSource) {
    super(dataSource, {} as Request);
  }

  async createUser(user: RegistrationDto) {
    return await this.getRepository(User).save(user);
  }

  async findUserByEmail(email: string) {
    return await this.getRepository(User).findOne({
      where: { email },
      select: ['id', 'email', 'roleId', 'password', 'verificationStatus'],
    });
  }

  async findUserByPhoneNumber(phoneNumber: string) {
    return await this.getRepository(User).findOne({
      where: { phoneNumber },
      select: ['id', 'email', 'roleId', 'password', 'verificationStatus'],
    });
  }

  async findUserById(id: string) {
    return await this.getRepository(User).findOne({
      where: { id },
      select: ['id', 'email', 'roleId', 'password', 'verificationStatus'],
    });
  }

  async findUserRefreshToken(userId: string) {
    return await this.getRepository(RefreshToken).findOne({
      where: { userId },
      select: ['hashedToken'],
    });
  }

  async saveRefreshToken(userId: string, hashedToken: string) {
    return await this.getRepository(RefreshToken).save({
      userId,
      hashedToken,
    });
  }

  async updateUserPassword(userId: string, password: string) {
    return await this.getRepository(User).update(userId, { password });
  }
}
