import {
  Body,
  Controller,
  Get,
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

@ApiTags('forms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
// @UseInterceptors(CacheInterceptor)
@Controller('forms')
export class FormsController {
  constructor(private readonly formService: FormService) {}

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
}
