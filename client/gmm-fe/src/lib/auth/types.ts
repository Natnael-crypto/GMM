import { User } from '../schemas/user';

export const Auth = 'auth';

export interface AuthState {
  user?: User;
  token?: string;
}
