import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from '../entities/apikey.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
  ) {}

  private generatePrefix(): string {
    return randomBytes(4).toString('base64').replace(/\+/g, '').replace(/\//g, '');
  }

  async generateApiKey(): Promise<string> {
    const prefix = this.generatePrefix();

    const rawApiKey = randomBytes(32).toString('base64');
    const fullApiKey = `${prefix}.${rawApiKey}`;

    const hashedApiKey = await bcrypt.hash(fullApiKey, 10);

    const apiKey = this.apiKeyRepository.create({
      prefix,
      api_key_hash: hashedApiKey,
    });

    await this.apiKeyRepository.save(apiKey);

    return fullApiKey;
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    const [prefix, rawKey] = apiKey.split('.');

    console.log(prefix, rawKey);

    if (!prefix) {
      return false;
    }

    const fullApiKey = `${prefix}.${rawKey}`;
    const hashedApiKey = await bcrypt.hash(fullApiKey, 10)
    console.log("full api key", fullApiKey);

    console.log('hashed api key', hashedApiKey);

    const apiKeyRecord = await this.apiKeyRepository.findOne({
      where: { prefix },
    });

    if (!apiKeyRecord) {
      return false;
    }

    const isValid = await bcrypt.compare(fullApiKey, apiKeyRecord.api_key_hash);

    return isValid;
  }

  async deactivateApiKey(apiKey: string): Promise<boolean> {
    const [prefix, rawKey] = apiKey.split('.');

    if (!prefix) {
      return false;
    }

    const fullApiKey = `${prefix}.${rawKey}`;
    const apiKeyRecord = await this.apiKeyRepository.findOne({
      where: { prefix, api_key_hash: await bcrypt.hash(fullApiKey, 10), is_active: true },
    });

    if (!apiKeyRecord) {
      return false;
    }

    apiKeyRecord.is_active = false;
    await this.apiKeyRepository.save(apiKeyRecord);

    return true;
  }
}
