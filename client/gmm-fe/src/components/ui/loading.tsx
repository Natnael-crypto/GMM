import { cn } from '@/lib/utils';

export default function Loading(props?: any) {
  return <div className={cn("loader w-[40px]", props?.className ? props.className : '')}></div>;
}
