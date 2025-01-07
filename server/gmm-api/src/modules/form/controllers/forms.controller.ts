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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FormService } from '../services/form.service';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { ApiKeyAuthGuard } from '@modules/auth/guards/apikey-auth.guard';
import { User } from '@modules/user/entities/user.entity';

@ApiTags('forms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
// @UseInterceptors(CacheInterceptor)
@Controller('forms')
export class FormsController {
  constructor(
    private readonly formService: FormService,
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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
  async submit(@Param('slug') slug: string, @Body() data: any, @Req() req: Request,) {
    const result = await this.formService.submit(slug, data);
    const userId = (req.user as User).id;
    
    // const keys = [
    //   `/forms/${slug}/submissions/${userId}`
    // ];

    // await Promise.all(keys.map(key => this.cacheManager.del(key)));
    
    return result;
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

  @UseGuards(ApiKeyAuthGuard)
  @ApiParam({ name: 'slug', type: 'string' })
  @Delete('cache/:slug')
  async invalidateFormCache(@Param('slug') slug: string) {
    try {
      // const keys = [
      //   `/forms`,
      //   `/forms/${slug}`,
      // ];
      // await Promise.all(keys.map(key => this.cacheManager.del(key)));

      return { message: `Cache for get form with slug '${slug}' invalidated successfully` };
    } catch (error) {
      throw new Error(`Error invalidating form cache for slug '${slug}': ${error.message}`);
    }
  }
}
