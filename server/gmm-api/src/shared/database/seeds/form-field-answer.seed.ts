import { FormFieldAnswer } from '@modules/form/entities/form-field-answer.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { formFieldAnswersData } from './seed-data/form-field-answer.data';

export default class FormFieldAnswerSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const formFieldAnswerRepository = dataSource.getRepository(FormFieldAnswer);

    // Create and save all answers from the data file
    const formFieldAnswers =
      formFieldAnswerRepository.create(formFieldAnswersData);
    await formFieldAnswerRepository.save(formFieldAnswers);
  }
}
