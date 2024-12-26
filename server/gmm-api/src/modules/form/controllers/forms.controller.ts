import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FormService } from '../services/form.service';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('forms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Controller('forms')
export class FormsController {
  constructor(
    private readonly formService: FormService,
    @Inject(Cache) private readonly cacheManager: Cache,
  ) {}

  @Get()
  async findAllForms() {
    return { data: await this.formService.findAllForms() };
  }

  @Get(':slug')
  async findOneForm(@Param('slug') slug: string) {
    const form = await this.formService.findOneForm(slug);

    if (!form) {
      throw new NotFoundException(`Form with slug ${slug} not found`);
    }

    return { data: form };
  }

  @ApiBody({ type: Object })
  @Post(':slug')
  async submit(@Param('slug') slug: string, @Body() data: any) {
    return await this.formService.submit(slug, data);
  }

  @ApiParam({ name: 'slug', type: 'string' })
  @ApiParam({ name: 'userId', type: 'string' })
  @Get(':slug/submissions/:userId')
  async getUserSubmission(
    @Param('slug') slug: string,
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    const submission = await this.formService.getUserSubmission(slug, userId);

    if (!submission) {
      throw new NotFoundException();
    }

    return { data: submission };
  }

  @ApiParam({ name: 'slug', type: 'string' })
  @Delete('cache/:slug')
  async invalidateFormCache(@Param('slug') slug: string) {
    try {
      const keys = [
        `/forms`,
        `/forms/${slug}`,
      ];
      await Promise.all(keys.map(key => this.cacheManager.del(key)));

      return { message: `Cache for get form with slug '${slug}' invalidated successfully` };
    } catch (error) {
      throw new Error(`Error invalidating form cache for slug '${slug}': ${error.message}`);
    }
  }
}
