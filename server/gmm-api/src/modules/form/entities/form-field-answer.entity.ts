import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { FormField } from './form-field.entity';
import { FormSubmission } from './submission.entity';

@Entity()
@Unique(['fieldId', 'submissionId'])
export class FormFieldAnswer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  value: any;

  @Column('uuid')
  fieldId: string;

  @Column('uuid')
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
