import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';


@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request & { user: any }) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('Invalid user');
    }
    const userId = req.user.id;
    return await this.userRepository.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return await this.userRepository.find();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userRepository.findOne({ where: { id: parseInt(id, 10) } });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id: parseInt(id, 10) } });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userRepository.findOne({ where: { id: parseInt(id, 10) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}
