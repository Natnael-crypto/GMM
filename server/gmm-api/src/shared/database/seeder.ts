import { runSeeders, SeederOptions } from 'typeorm-extension';
import userFactory from './factories/user.factory';
import { User } from '@modules/user/entities/user.entity';
import { Match } from '@modules/matchmaking/entities/match.entity';
import { InvitationToMatchStage } from '@modules/matchmaking/entities/invitation-to-match-stage.entity';
import { Role } from '@modules/auth/entities/role.entity';
import { Permission } from '@modules/auth/entities/permission.entity';
import { Preference } from '@modules/matchmaking/entities/preference.entity';
import { Subscription } from '@modules/payment/entities/subscription.entity';
import { SubscriptionHistory } from '@modules/payment/entities/subscription-history.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import PermissionSeeder from './seeds/permission.seed';

require('dotenv').config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT!,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: [
    User,
    Match,
    InvitationToMatchStage,
    Permission,
    Role,
    Preference,
    Subscription,
    SubscriptionHistory,
  ],
};

const dataSource = new DataSource(options);

(async () => {
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: [PermissionSeeder],
    factories: [userFactory],
  });

  process.exit(0);
})();
