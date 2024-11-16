import { BaseEntity } from '@shared/entities/base.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { FormField } from './form-field.entity';
import { FormSubmission } from './submission.entity';

@Entity()
export class Form extends BaseEntity {
  @PrimaryColumn()
  slug: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => FormField, (field) => field.form)
  fields: FormField[];

  @OneToMany(() => FormSubmission, (submission) => submission.form)
  submissions: FormSubmission[];
}
