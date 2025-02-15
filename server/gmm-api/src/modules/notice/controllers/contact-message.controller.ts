import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { ContactMessageDto } from '../dtos/contact-message.dto';
import { Request } from 'express';
import { UpdateContactMessageDto } from '../dtos/update-contact-message.dto';
import { ApiKeyAuthGuard } from '@modules/auth/guards/apikey-auth.guard';
import { ContactMessageService } from '../services/contact-message.service';
import { User } from '@modules/user/entities/user.entity';
import { ContactResponseDto } from '../dtos/contact-response.dto';

@ApiTags('Contact Message')
@ApiBearerAuth()
@Controller('contact-message')
export class ContactMessageController {
  constructor(private readonly contactMessageService: ContactMessageService) {}

  @ApiBody({ type: ContactMessageDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() contactMessage: ContactMessageDto, @Req() req: Request) {
    const message = await this.contactMessageService.createContactMessage(
      (req.user as User).id,
      contactMessage,
    );

    const response = new ContactResponseDto();
    response.success = true;
    response.IssueId = message.issueId;

    return {
      message: 'Contact message created successfully',
      data: response,
    };
  }

  @ApiBody({ type: UpdateContactMessageDto })
  @UseGuards(ApiKeyAuthGuard)
  @Patch('/:messageId')
  async update(
    @Param('messageId') messageId: string,
    @Body() contactStatus: UpdateContactMessageDto,
  ) {
    const message = await this.contactMessageService.updateContactMessageStatus(
      messageId,
      contactStatus.status,
    );

    return {
      message: 'Contact message status updated successfully',
      data: message,
    };
  }
}
