import createMiddleware from 'next-intl/middleware';
import { locales } from '@/config';

export default createMiddleware({
  locales: locales,

  defaultLocale: 'en',
});

export const config = {
  matcher: [
    '/',
    `/(en|sq|ar|bs|zh\-yue|zh\-guoyu|nl|tl|fr|de|id|it|ms\-MY|pt|ru|so|es|tr)/:path*`,
  ],
};
