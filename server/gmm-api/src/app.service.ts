import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  health() {
    return {
      status: 'ok',
      env: JSON.stringify(this.configService.get<string>('env')),
    };
  }
}
