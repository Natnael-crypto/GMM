import { Injectable, NestInterceptor, ExecutionContext, CallHandler, } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { META_NOTICE } from '../decorators/notice.decorator';

import { NotifyOptions } from '@shared/types/notify.options';
import { NoticeService } from '@modules/notice/services/notice.service';


@Injectable()
export class NoticeInterceptor implements NestInterceptor {
 constructor( private _noticeService: NoticeService,
            private _reflector: Reflector) {}
 intercept(context: ExecutionContext, next: CallHandler):
           Observable<any> 
 {
   //Determine if request is for notification
   const notice = this.mergeNotice(
         this._reflector.get<NotifyOptions>(META_NOTICE, 
             context.getClass()),
         this._reflector.get<NotifyOptions>(META_NOTICE, 
             context.getHandler()),
   );
  
   if (!notice) {
      return next.handle();
   }
   //Call notification logic
   const req = context.switchToHttp().getRequest();
   return next.handle().pipe(
       tap(() => this._noticeService.notifyByEmail(notice, req)),
       tap(() => console.log('Notified by Notice Module')),
   );
 }
 mergeNotice(obj1: NotifyOptions, obj2: NotifyOptions):
    NotifyOptions  
 {
  return {...obj1,...obj2,};
 }
}