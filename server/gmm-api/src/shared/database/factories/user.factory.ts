import { User } from '@modules/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';

const userPassword = bcrypt.hashSync('password', 10);

export default setSeederFactory(User, (faker) => {
  const user = new User();

  user.firstName = faker.person.firstName('male');
  user.lastName = faker.person.lastName('male');
  user.email = faker.internet.email({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  user.dateOfBirth = faker.date.between({
    from: '1990-01-01',
    to: '2000-01-01',
  });
  user.bornOrRevertToIslam = 'Born Muslim';
  user.password = userPassword;
  return user;
});
