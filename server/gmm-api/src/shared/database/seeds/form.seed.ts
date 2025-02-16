import { Form } from '@modules/form/entities/form.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { formsData } from './seed-data/form.data';

export default class FormSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const formRepository = dataSource.getRepository(Form);

    // Create and save all forms from the data file
    const forms = formRepository.create(formsData);
    await formRepository.save(forms);
  }
}
