import { Controller, Get, NotFoundException, UseInterceptors, Delete, Param, Inject } from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  Pagination,
  PaginationParams,
} from '@shared/decorators/pagination.decorator';
import { Sorting, SortingParams } from '@shared/decorators/sorting.decorator';
import {
  Filtering,
  FilteringParams,
} from '@shared/decorators/filter.decorator';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

const blogSortableFields = ['slug', 'title'];
const blogFilterableFields = ['content', 'title', 'excerpt'];

@UseInterceptors(CacheInterceptor)
@Controller('blogs')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'Filter parameters (e.g. filter=field:rule:value,field:rule)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    description: 'Sorting parameters (e.g. sort=field:asc|desc)',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination (defaults to 0)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page (defaults to 10)',
  })
  @Get()
  async getBlogs(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(blogSortableFields) sortingParams: Sorting,
    @FilteringParams(blogFilterableFields)
    filteringParams: Filtering[],
  ) {
    try {
      return await this.blogService.getBlogs(
        paginationParams,
        sortingParams,
        filteringParams,
      );
    } catch (e) {
      return { message: e.message, totalItems: 0, data: [], page: 0, limit: 0 };
    }
  }

  @ApiParam({ name: 'slug', type: 'string' })
  @Get(':slug')
  async getBlog(slug: string) {
    const blog = await this.blogService.getBlog(slug);
    if (!blog) {
      throw new NotFoundException(`Blog with slug ${slug} not found`);
    }

    return {
      data: blog,
    };
  }

  @Delete('cache/:slug')
  async deleteCache(@Param('slug') slug: string) {
    const keys = [
      `/blogs`,
      `/blogs/${slug}`,
    ];

    await Promise.all(keys.map(key => this.cacheManager.del(key)));    
    return { message: `Cache for blog with slug ${slug} has been invalidated` };
  }

}
