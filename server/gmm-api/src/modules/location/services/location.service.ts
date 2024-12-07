import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Country } from '../entities/country.entity';
import { State } from '../entities/state.entity';
import { City } from '../entities/city.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
    @InjectRepository(State) private stateRepository: Repository<State>,
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  async findAllCountries() {
    return await this.countryRepository.find();
  }

  async findOneCountry(id: number) {
    return await this.countryRepository.findOne({
      where: { id },
      relations: ['states', 'states.cities'],
    });
  }

  async findAllStates() {
    return await this.stateRepository.find();
  }

  async findOneState(id: number) {
    return await this.stateRepository.findOne({
      where: { id },
      relations: ['cities'],
    });
  }

  async findAllCities() {
    return await this.cityRepository.find();
  }

  async findOneCity(id: number) {
    return await this.cityRepository.findOne({
      where: { id },
    });
  }

  async findCountryCities(countryId: number) {
    const cities = await this.cityRepository.find({
      where: {
        state: {
          country: {
            id: countryId,
          },
        },
      },
    });

    return cities;
  }

  async findCountriesCities(countryIds: number[]) {
    const cities = await this.cityRepository.find({
      where: {
        state: {
          country: {
            id: In(countryIds),
          },
        },
      },
      order: {
        state: {
          country: {
            id: 'ASC',
          },
        },
      },
    });

    return cities;
  }

  async findStateCities(stateId: number) {
    const cities = await this.cityRepository.find({
      where: {
        state: {
          id: stateId,
        },
      },
    });

    return cities;
  }

  async findCountryStates(countryId: number) {
    const states = await this.stateRepository.find({
      where: {
        country: {
          id: countryId,
        },
      },
    });

    return states;
  }
}
