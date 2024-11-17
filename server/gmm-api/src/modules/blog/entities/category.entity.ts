import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './blog.entity';
import { BaseEntity } from '@shared/entities/base.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Blog, (blog) => blog.categories)
  blogs: Blog[];
}
