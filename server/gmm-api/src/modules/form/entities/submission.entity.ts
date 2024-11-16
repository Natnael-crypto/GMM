import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Form } from './form.entity';
import { FormFieldAnswer } from './form-field-answer.entity';
import { User } from '@modules/user/entities/user.entity';

@Entity()
export class FormSubmission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  formSlug: string;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => Form, (form) => form.submissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'formSlug' })
  form: Form;

  @ManyToOne(() => User, (user) => user.formSubmissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => FormFieldAnswer, (answer) => answer.submission)
  answers: FormFieldAnswer[];
}
