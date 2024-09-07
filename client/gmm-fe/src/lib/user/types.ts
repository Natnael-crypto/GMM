import {
  ExpectedIslamicLifestyle,
  IslamicLifestyle,
} from '../schemas/islamic-lifestyle';
import { MarriageDiscussion } from '../schemas/marriage-discussion';
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

export interface UpdateExpectedIslamicLifestyle {
  userId: string;
  expectedIslamicLifestyle: ExpectedIslamicLifestyle;
}

export interface UpdateMarriageDiscussion {
  userId: string;
  marriageDiscussion: MarriageDiscussion;
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
