import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from './options';
import { FormFieldDisplayWidth } from '../enums/form-field';
import { Form } from './form.entity';
import { FormFieldAnswer } from './form-field-answer.entity';

@Entity()
export class FormField {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  placeholder: string;

  @Column('jsonb', { nullable: true })
  options: Option[];

  @Column({ nullable: true, default: 'true' })
  show: string;

  @Column({
    type: 'enum',
    enum: FormFieldDisplayWidth,
    default: FormFieldDisplayWidth.Three,
  })
  displayWidth: FormFieldDisplayWidth;

  @Column({ nullable: true })
  defaultValue: string;

  @Column({ nullable: true })
  minValue: string;

  @Column({ nullable: true })
  maxValue: string;

  @Column({ nullable: true })
  minLength: number;

  @Column({ nullable: true })
  maxLength: number;

  @Column('numeric')
  order: number;

  @ManyToOne(() => Form, (form) => form.slug, { onDelete: 'CASCADE' })
  form: Form;

  @OneToMany(() => FormFieldAnswer, (answer) => answer.field)
  answers: Form[];

  @DeleteDateColumn()
  deletedAt: Date;
}
