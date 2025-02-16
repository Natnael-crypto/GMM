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

    const states = await stateRepo.save([
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
        countryId: 2,
        name: 'Texas',
      },
      {
        id: 5,
        countryId: 3,
        name: 'Addis Ababa',
      },
    ]);

    await cityRepo.save([
      {
        stateId: states[0].id,
        name: 'Calgary',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: states[0].id,
        name: 'Edmonton',
        longitude: '1.91028',
        latitude: '11.1341',
      },
      {
        stateId: states[1].id,
        name: 'Vancouver',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: states[1].id,
        name: 'Victoria',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: states[2].id,
        name: 'Los Angeles',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: states[2].id,
        name: 'San Francisco',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: states[3].id,
        name: 'Houston',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: states[3].id,
        name: 'Austin',
        longitude: '1.91028',
        latitude: '1.920',
      },
      {
        stateId: states[4].id,
        name: 'Addis Ababa',
        longitude: '1.91028',
        latitude: '1.920',
      },
    ]);
  }
}
