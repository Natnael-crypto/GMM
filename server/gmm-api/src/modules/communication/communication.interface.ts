import { RequestMethod } from '@nestjs/common';
import { Queue } from './enums/sqs.enum';

export interface ICommunicationPayload {
  httpMethod: RequestMethod;
  path: string;
  body?: unknown;
  headers: object;
}

export interface ICallbackInfo {
  callbackQueue: Queue;
  callbackPath: string;
  callerId: string;
  requestAction: IRequestAction;
}

export interface IQueueRequest<T> {
  payload: T;
  callbackInfo: ICallbackInfo;
}

export interface ICallbackMessage<T> {
  requestAction: IRequestAction;
  isSuccessful: boolean;
  resultMessage: string;
  callerId: string;
  result?: T;
}

export interface IRequestAction {
  httpMethod: RequestMethod;
  path: string;
}
