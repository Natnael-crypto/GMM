import {
  ExpectedWorldlyLifestyle,
  WorldlyLifestyle,
} from '../schemas/worldly-lifestyle';

export interface UpdateWorldlyLifestyle {
  userId: string;
  worldlyLifestyle: WorldlyLifestyle;
}

export interface UpdateExpectedWorldlyLifestyle {
  userId: string;
  expectedWorldlyLifestyle: ExpectedWorldlyLifestyle;
}

export interface UpdateIslamicLifestyle {
  userId: string;
  islamicLifestyle: IslamicLifestyle;
}
