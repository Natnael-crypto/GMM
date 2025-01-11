import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LambdaService } from '@modules/communication/services/lambda.service';
import { LambdaFunction } from '@modules/communication/enums/lambda-functions.enum';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly lambdaService: LambdaService,
  ) {}

  @Get()
  async health() {
    console.log('AppController.health()');
    return await this.appService.health();
  }

  @Get('/lambda')
  async lambda() {
    const response = await this.lambdaService.invoke(
      LambdaFunction.RekognitionImageValidator,
      '/',
    );
    return `AppController.lambda(): ${response}`;
  }
}
