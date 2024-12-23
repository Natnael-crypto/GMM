import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { LocationService } from '../services/location.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('locations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(CacheInterceptor)
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('countries')
  async findAllCountries() {
    return { data: await this.locationService.findAllCountries() };
  }

  @Get('countries/:id')
  async findOneCountry(@Param('id') id: number) {
    const country = await this.locationService.findOneCountry(id);

    if (!country) {
      throw new NotFoundException(`Country with id ${id} not found`);
    }

    return { data: country };
  }

  @Get('states')
  async findAllStates() {
    return { data: await this.locationService.findAllStates() };
  }

  @Get('states/:id')
  async findOneState(@Param('id') id: number) {
    const state = await this.locationService.findOneState(id);

    if (!state) {
      throw new NotFoundException(`State with id ${id} not found`);
    }

    return { data: state };
  }

  @Get('cities/:id')
  async findOneCity(@Param('id') id: number) {
    const city = await this.locationService.findOneCity(id);

    if (!city) {
      throw new NotFoundException(`City with id ${id} not found`);
    }

    return { data: city };
  }

  @Get('countries/:id/cities')
  async findCountryCities(@Param('id') id: number) {
    const cities = await this.locationService.findCountryCities(id);

    return { data: cities };
  }

  @Get('cities')
  @ApiQuery({ name: 'countryIds', required: false })
  async findCountriesCities(@Query('countryIds') countryIds: string) {
    if (!countryIds) {
      return { data: await this.locationService.findAllCities() };
    }

    const cities = await this.locationService.findCountriesCities(
      countryIds
        .split(',')
        .map((value) => parseInt(value))
        .filter((value) => !isNaN(value)),
    );

    return {
      data: cities,
    };
  }

  @Get('states/:id/cities')
  async findStateCities(@Param('id') id: number) {
    const cities = await this.locationService.findStateCities(id);

    return { data: cities };
  }
}
