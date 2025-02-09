import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Country } from '@modules/location/entities/country.entity';
import { City } from '@modules/location/entities/city.entity';
import { State } from '@modules/location/entities/state.entity';

export default class LocationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const countryRepo = dataSource.getRepository(Country);
    const cityRepo = dataSource.getRepository(City);
    const stateRepo = dataSource.getRepository(State);

    await countryRepo.save([
      {
        id: 1,
        name: 'Canada',
        currency: 'CAD',
      },
      {
        id: 2,
        name: 'United States',
        currency: 'USD',
      },
      {
        id: 3,
        name: 'Ethiopia',
        currency: 'ETB',
      },
    ]);

    await stateRepo.save([
      {
        id: 1,
        countryId: 1,
        name: 'Alberta',
      },

      {
        id: 2,
        countryId: 1,
        name: 'British Columbia',
      },

      {
        id: 3,
        countryId: 2,
        name: 'California',
      },
      {
        id: 4,
        name: 'Texas',
      },
      {
        id: 5,
        name: 'Addis Ababa',
      },
    ]);

    await cityRepo.save([
      {
        stateId: 1,
        name: 'Calgary',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: 1,
        name: 'Edmonton',
        longitude: '1.91028',
        latitude: '11.1341',
      },
      {
        stateId: 2,
        name: 'Vancouver',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: 2,
        name: 'Victoria',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: 3,
        name: 'Los Angeles',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: 3,
        name: 'San Francisco',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: 4,
        name: 'Houston',
        longitude: '1.91028',
        latitude: '1.920',
      },
      { stateId: 4, name: 'Austin', longitude: '1.91028', latitude: '1.920' },
      {
        stateId: 5,
        name: 'Addis Ababa',
        longitude: '1.91028',
        latitude: '1.920',
      },
    ]);
  }
}
