import { User } from '../schemas/user';

export interface Match {
  id: string;
  maleUserId: string;
  femaleUserId: string;
  isActive: boolean;
  createdAt: Date;
  maleUser: User;
  femaleUser: User;
}
