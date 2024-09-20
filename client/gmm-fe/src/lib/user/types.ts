import { FamilyIntroduction } from '../schemas/family-introduction';
import {
  ExpectedIslamicLifestyle,
  IslamicLifestyle,
} from '../schemas/islamic-lifestyle';
import { MarriageDiscussion } from '../schemas/marriage-discussion';
import { User } from '../schemas/user';
import {
  ExpectedWorldlyLifestyle,
  WorldlyLifestyle,
} from '../schemas/worldly-lifestyle';

export interface UpdateUser {
  user: User;
  self: boolean;
}

export interface UpdateWorldlyLifestyle {
  userId: string;
  worldlyLifestyle: WorldlyLifestyle;
  self: boolean;
}

export interface UpdateExpectedWorldlyLifestyle {
  userId: string;
  expectedWorldlyLifestyle: ExpectedWorldlyLifestyle;
  self: boolean;
}

export interface UpdateIslamicLifestyle {
  userId: string;
  islamicLifestyle: IslamicLifestyle;
  self: boolean;
}

export interface UpdateExpectedIslamicLifestyle {
  userId: string;
  expectedIslamicLifestyle: ExpectedIslamicLifestyle;
  self: boolean;
}

export interface UpdateMarriageDiscussion {
  userId: string;
  marriageDiscussion: MarriageDiscussion;
  self: boolean;
}

export interface UpdateFamilyIntroduction {
  userId: string;
  familyIntroduction: FamilyIntroduction;
  self: boolean;
}

export interface UploadFileInfo {
  type: string;
  size: number;
  checksum: string;
}

export interface UploadFile {
  url: string;
  file: File;
}

export interface UrlResponse {
  url: string;
  fileKey: string;
}
