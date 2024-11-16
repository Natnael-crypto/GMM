import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { BaseRepository } from '@shared/base-repository';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { Form } from '../entities/form.entity';
import { FormSubmission } from '../entities/submission.entity';
import { FormFieldAnswer } from '../entities/form-field-answer.entity';
import { User } from '@modules/user/entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class FormService extends BaseRepository {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    dataSource: DataSource,
  ) {
    super(dataSource, req);
  }

  async findAllForms() {
    return await this.getRepository(Form).find();
  }

  async findOneForm(slug: string) {
    return await this.getRepository(Form).findOne({
      where: { slug },
      relations: ['fields'],
    });
  }

  async submit(slug: string, data: any) {
    const form = await this.getRepository(Form).findOne({
      where: { slug },
      relations: ['fields'],
    });

    if (!form) {
      return null;
    }

    if (!this.req.user) {
      throw new BadRequestException('User not found');
    }

    let submission = await this.getRepository(FormSubmission).findOne({
      where: { formSlug: form.slug, userId: (this.req.user as User).id },
    });

    if (!submission) {
      submission = await this.getRepository(FormSubmission).save({
        form,
        user: this.req.user,
      });
    }

    const answers = form.fields
      .map((field) => {
        const value = data[field.id];

        return this.getRepository(FormFieldAnswer).create({
          field,
          submission,
          value,
        });
      })
      .filter((answer) => !!answer.value);

    await this.getRepository(FormFieldAnswer).save(answers);

    return submission;
  }

  async getUserSubmission(slug: string, userId: string) {
    const submission = await this.getRepository(FormSubmission).findOne({
      where: { formSlug: slug, userId },
      relations: ['answers', 'answers.field'],
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return submission.answers;
  }

  async describeUser(userId: string) {
    const submissions = await this.getRepository(FormSubmission).find({
      where: {
        userId,
      },
      relations: ['answers', 'answers.field'],
      select: {
        id: true,
        formSlug: true,
        answers: {
          value: true,
          field: {
            id: true,
            name: true,
          },
        },
      },
    });

    return submissions;
  }
}
