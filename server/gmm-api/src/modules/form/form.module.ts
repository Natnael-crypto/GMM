import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { FormField } from './entities/form-field.entity';
import { FormSubmission } from './entities/submission.entity';
import { FormFieldAnswer } from './entities/form-field-answer.entity';
import { FormService } from './services/form.service';
import { FormsController } from './controllers/forms.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Form,
      FormField,
      FormSubmission,
      FormFieldAnswer,
    ]),
  ],
  controllers: [FormsController],
  providers: [FormService],
  exports: [TypeOrmModule, FormService],
})
export class FormModule {}
