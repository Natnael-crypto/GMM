export class NotifyOptions {
    msg: string;
    emailListID: string;
    absoluteRefResource?: string;
    relativeRefResource?: string;
    subject?: string;
 }

 export class NoticeModuleOptions { 
    listsImports: any[];
    listsProvider: any;
    envTransport: string;
    from?: string;
 }