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
      throw new UnauthorizedException('API Key missing');
    }

    const isValid = await this.apiKeyService.validateApiKey(apiKey);
    if (!isValid) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return this.success(true);
  }
}
