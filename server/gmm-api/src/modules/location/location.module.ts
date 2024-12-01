import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
import { City } from './entities/city.entity';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, State, City])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [TypeOrmModule],
})
export class LocationModule {}
