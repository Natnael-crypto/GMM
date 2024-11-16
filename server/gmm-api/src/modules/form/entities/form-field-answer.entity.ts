import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { FormField } from './form-field.entity';
import { FormSubmission } from './submission.entity';

@Entity()
export class FormFieldAnswer extends BaseEntity {
  @Column('jsonb')
  value: any;

  @PrimaryColumn()
  fieldId: string;

  @PrimaryColumn()
  submissionId: string;

  @ManyToOne(() => FormField, (field) => field.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fieldId' })
  field: FormField;

  @ManyToOne(() => FormSubmission, (submission) => submission.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'submissionId' })
  submission: FormSubmission;
}
