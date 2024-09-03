import { NotAcceptableException, NotFoundException } from '@nestjs/common';

export class FileNotFoundException extends NotFoundException {
  constructor(public message: string) {
    super(`File ${message} not found`);
  }
}

export class FileDeleteException {
  constructor(public message: string) {}
}

export class UnsupportedFileTypeException extends NotAcceptableException {
  constructor(public message: string) {
    super(`File type ${message} is not supported`);
  }
}
