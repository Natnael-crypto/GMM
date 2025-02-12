import { FormField } from '@modules/form/entities/form-field.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { formFieldsData } from './seed-data/form-field.data';

export default class FormFieldSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const formFieldRepository = dataSource.getRepository(FormField);

    // Create and save all fields from the data file
    const formFields = formFieldRepository.create(formFieldsData);
    await formFieldRepository.save(formFields);
  }
}
