// // src/notifications/channels/http-channel.service.ts
// import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';

// import { Notification } from '../types/notification.interface';


// @Injectable()
// export class HttpChannelService {
//   constructor(private readonly httpService: HttpService) {}

//   async send(notification: Notification): Promise<void> {
//     const data = notification.toPayload();
//     const url = 'https://your-webhook-url.com/notify'; 
//     await this.httpService.post(url, data).toPromise();
//   }
// }
