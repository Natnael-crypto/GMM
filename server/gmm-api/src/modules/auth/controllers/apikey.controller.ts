import { Controller, Post, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiKeyService } from "../services/apikey.service";

@ApiTags('apiKeys')
@Controller('apiKeys')
export class ApiKeysController {
    constructor(
        private readonly apiKeyService: ApiKeyService,
    ) {}

    @Post('apikey')
    async generateApiKey() {
        const apiKey = await this.apiKeyService.generateApiKey();

        return { apiKey };
    }

    @Post('validate')
    async validateApiKey(@Query('apiKey') apiKey: string) {
        const isValid = await this.apiKeyService.validateApiKey(apiKey);

        return { isValid };

    }
}