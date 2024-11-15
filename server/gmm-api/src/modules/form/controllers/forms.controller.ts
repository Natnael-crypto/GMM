import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FormService } from '../services/form.service';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '@modules/user/entities/user.entity';

@ApiTags('forms')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('forms')
export class FormsController {
  constructor(private readonly formService: FormService) {}

  @Get()
  async findAllForms() {
    return { data: await this.formService.findAllForms() };
  }
  @Get('findAll')
  async getUserSubmissions(@Req() req: Request) {
    console.log((req.user as User).id);
    return await this.formService.describeUser((req.user as User).id);
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
  @Get(':slug/submission/:userId')
  async getUserSubmission(
    @Param('slug') slug: string,
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    return await this.formService.getUserSubmission(slug, userId);
  }
}
