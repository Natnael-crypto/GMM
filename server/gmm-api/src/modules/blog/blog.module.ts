import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Category } from './entities/category.entity';
import { BlogController } from './controller/blog.controller';
import { BlogService } from './services/blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Category])],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [],
})
export class BlogModule {}
