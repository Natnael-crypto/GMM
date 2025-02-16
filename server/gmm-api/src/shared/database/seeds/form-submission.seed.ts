import { FormSubmission } from '@modules/form/entities/submission.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { formSubmissionsData } from './seed-data/form-submission.data';

export default class FormSubmissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const formSubmissionRepository = dataSource.getRepository(FormSubmission);

    // Create and save all submissions from the data file
    const formSubmissions =
      formSubmissionRepository.create(formSubmissionsData);
    await formSubmissionRepository.save(formSubmissions);
  }
}
