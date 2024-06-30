import { Injectable } from '@nestjs/common'; 
import { EmailLists } from '@shared/config';
import { EMAIL_LISTS_ID } from '../user.module';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';



@Injectable()
export class UserService implements EmailLists {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

     async getList(id: string): Promise<string[]> {
         switch (id) {
            case EMAIL_LISTS_ID.All_Registered_Users: 
                const users = await this.userRepository.find();
                return users.map(user => user.email);
         }
         return [];
     }
}
