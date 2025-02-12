import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { BaseRepository } from '@shared/base-repository';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { Blog } from '../entities/blog.entity';
import { Pagination } from '@shared/decorators/pagination.decorator';
import { Sorting } from '@shared/decorators/sorting.decorator';
import { Filtering } from '@shared/decorators/filter.decorator';
import { getOrder, getWhere } from '@shared/decorators/filter.helper';

@Injectable({ scope: Scope.REQUEST })
export class BlogService extends BaseRepository {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    dataSource: DataSource,
  ) {
    super(dataSource, req);
  }

  async getBlogs(
    { page, limit, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering[],
  ) {
    const where = getWhere(filter);
    const order = getOrder(sort);

    const [blogs, total] = await this.getRepository(Blog).findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      data: blogs,
      page,
      limit,
    };
  }

  async getBlog(slug: string) {
    const blog = await this.getRepository(Blog).findOne({
      where: { slug },
      relations: ['categories'],
    });

    if (!blog) {
      console.log('No blog found with slug:', slug);
    }

    return blog;
  }
}
