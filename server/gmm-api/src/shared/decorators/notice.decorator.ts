import { SetMetadata } from '@nestjs/common';
import { NotifyOptions } from '@shared/types/notify.options';

export const META_NOTICE = 'notice_metadata';
export const Notify = (options: NotifyOptions) =>
                       SetMetadata(META_NOTICE, options);