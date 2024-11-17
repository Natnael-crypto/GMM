import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Category } from './category.entity';
import { BlogStatus } from '../enums/blog.enum';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryColumn()
  slug: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({
    type: 'enum',
    enum: BlogStatus,
    default: BlogStatus.DRAFT,
  })
  status: BlogStatus;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ type: 'simple-array', nullable: true })
  authors: string[];

  @Column({ nullable: true, type: 'text' })
  content: string;

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToMany(() => Category, (category) => category.blogs)
  @JoinTable({
    name: 'blog_categories',
    joinColumn: { name: 'blog_slug', referencedColumnName: 'slug' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
