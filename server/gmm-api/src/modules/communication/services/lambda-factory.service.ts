import { Injectable } from '@nestjs/common';
import { Lambda } from '@aws-sdk/client-lambda';

interface ILambdaClient {
  lambda: Lambda;
  functionName: string;
}

@Injectable()
export class LambdaFactory {
  private lambdaInstance: Lambda;

  constructor() {}

  public getLambda(service: string): ILambdaClient {
    const functionName = service;

    this.lambdaInstance = this.lambdaInstance ?? new Lambda({});

    return {
      lambda: this.lambdaInstance,
      functionName: functionName,
    };
  }
}
