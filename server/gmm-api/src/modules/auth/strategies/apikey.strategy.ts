import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { ApiKeyService } from '../services/apikey.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'apikey') {
  constructor(private readonly apiKeyService: ApiKeyService) {
    super(); // No specific options required for API key strategy
  }

  async authenticate(req) {
    const apiKey = req.headers['api-key'] || req.query.apiKey;

    if (!apiKey) {
      this.fail(new UnauthorizedException('API Key missing'), 401);
    }

    const isValid = await this.apiKeyService.validateApiKey(apiKey);
    if (!isValid) {
      this.fail(new UnauthorizedException('Invalid API Key'), 401);
    }

    return this.success(true);
  }
}
