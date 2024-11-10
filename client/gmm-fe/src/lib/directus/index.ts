import { createDirectus, rest } from '@directus/sdk';

const directus = createDirectus(
  'https://admin-dev.guardianmuslimmarriage.com/'
).with(rest());

export default directus;
