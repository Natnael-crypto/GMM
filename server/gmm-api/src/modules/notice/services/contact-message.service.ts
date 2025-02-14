import { UserService } from '@modules/user/services/user.service';
import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { BaseRepository } from '@shared/base-repository';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { ContactMessageDto } from '../dtos/contact-message.dto';
import { ContactMessage } from '../entities/contact-message.entity';
import { ContactMessageStatus } from '../enums/contact-message-status.enum';
import { NoticeService } from './notice.service';

@Injectable({ scope: Scope.REQUEST })
export class ContactMessageService extends BaseRepository {
  constructor(
    private readonly userService: UserService,
    private readonly noticeService: NoticeService,
    @Inject(REQUEST) req: Request,
    dataSource: DataSource,
  ) {
    super(dataSource, req);
  }

  async createContactMessage(id: string, data: ContactMessageDto) {
    const user = await this.userService.getUserById(id);

    return await this.getRepository(ContactMessage).save({
      email: user.email,
      message: data.message,
      issueId: this.generateIssueId(),
      userId: user.id,
    });
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await this.getRepository(ContactMessage).find();
  }

  async getContactMessageByIssueId(issueId: string): Promise<ContactMessage> {
    const contactMessage = await this.getRepository(ContactMessage).findOneBy({
      issueId,
    });

    if (!contactMessage) {
      throw new NotFoundException('Contact message not found');
    }

    return contactMessage;
  }

  async getContactMessageById(id: string): Promise<ContactMessage> {
    const contactMessage = await this.getRepository(ContactMessage).findOneBy({
      id,
    });

    if (!contactMessage) {
      throw new NotFoundException('Contact message not found');
    }

    return contactMessage;
  }

  async updateContactMessageStatus(id: string, status: ContactMessageStatus) {
    const contactMessage = await this.getRepository(ContactMessage).findOneBy({
      id,
    });

    if (!contactMessage) {
      throw new NotFoundException('Contact message not found');
    }

    const user = await this.userService.getUserById(contactMessage.id);

    if (status === ContactMessageStatus.RESOLVED) {
      await this.noticeService.sendContactMessageResolvedEmail(
        contactMessage.issueId,
        user.email,
      );
    }

    if (status === ContactMessageStatus.CLOSED) {
      await this.noticeService.sendContactMessageClosedEmail(
        contactMessage.issueId,
        user.email,
      );
    }

    contactMessage.status = status;
    contactMessage.updatedAt = new Date();

    return await this.getRepository(ContactMessage).save(contactMessage);
  }

  async deleteContactMessage(id: string) {
    const contactMessage = await this.getRepository(ContactMessage).findOneBy({
      id,
    });

    if (!contactMessage) {
      throw new NotFoundException('Contact message not found');
    }

    return await this.getRepository(ContactMessage).remove(contactMessage);
  }

  generateIssueId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
  }
}
