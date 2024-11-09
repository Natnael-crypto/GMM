import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

dotenvConfig();

const baseDir = 'dist';

export const dataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: parseInt(`${process.env.DATABASE_PORT}`, 10),
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  autoLoadEntities: true,
  synchronize: false,
  entities: [`${baseDir}/modules/**/*.entity.{ts,js}`],
  migrations: [`${baseDir}/migrations/**/*{.js,.ts}`],
  seeds: [`${baseDir}/shared/database/seeds/**/*.seed.{ts,js}`],
  factories: [`${baseDir}/shared/database/factories/**/*.factory.{ts,js}`],
  migrationsRun: true,
  migrationsTableName: 'typeorm_migrations',
} as DataSourceOptions & SeederOptions;

export default registerAs('typeorm', () => dataSourceOptions);
export const dataSource = new DataSource(
  dataSourceOptions as DataSourceOptions,
);
