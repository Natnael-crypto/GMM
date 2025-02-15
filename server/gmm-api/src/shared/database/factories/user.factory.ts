import { User } from '@modules/user/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import * as bcrypt from 'bcrypt';
import {
  AccountStatus,
  AccountVerificationStatus,
  Gender,
} from '@modules/user/enums/user.enum';

const userPassword = bcrypt.hashSync('password', 10);

export default setSeederFactory(User, (faker) => {
  const user = new User();

  const gender = faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE]);
  const genderString = gender === Gender.MALE ? 'male' : 'female';

  user.firstName = faker.person.firstName(genderString);
  user.lastName = faker.person.lastName(genderString);

  user.gender = gender;

  user.phoneNumber = faker.phone.number();

  user.email = faker.internet
    .email({
      firstName: user.firstName,
      lastName: user.lastName,
    })
    .toLowerCase();

  user.password = userPassword;

  user.city = faker.location.city();
  user.country = faker.location.country();

  user.dateOfBirth = faker.date.between({
    from: '1990-01-01',
    to: '2000-01-01',
  });

  user.height = faker.number.int({ min: 150, max: 200 });
  user.weight = faker.number.int({ min: 50, max: 100 });

  user.languages = faker.helpers.arrayElements(['en', 'fr', 'ar', 'es']);

  user.roleId = 'User';

  user.accountStatus = faker.helpers.arrayElement([
    AccountStatus.APPROVED,
    AccountStatus.DENIED,
    AccountStatus.PENDING,
    AccountStatus.SUSPENDED,
    AccountStatus.INCOMPLETE_REGISTRATION,
  ]);

  user.verificationStatus = faker.helpers.arrayElement([
    AccountVerificationStatus.UNVERIFIED,
    AccountVerificationStatus.VERIFIED,
  ]);

  user.createdAt = faker.date.recent();

  if (Math.random() < 0.05) {
    return user;
  }

  user.nationality = faker.location.country();
  user.currentCountry = faker.location.country();

  user.maritalStatus = faker.helpers.arrayElement([
    'Single/Never Married',
    'Single/Legally Divorced',
    'Single/Islamically-Divorced',
    'Widowed',
    'Other',
  ]);

  user.hasChildren = faker.helpers.arrayElement([
    'No kids',
    'Yes but not with me',
    'Yes 20%+ Shared parenting',
    'Yes: 50%+ Joint-Shared Parenting',
    'Yes Full-Time Single Parent',
  ]);

  if (user.hasChildren !== 'No kids') {
    user.numberOfChildren = faker.number.int({ min: 1, max: 10 });

    if (user.numberOfChildren > 0) {
      user.ageOfOldestChild = faker.number.int({ min: 0, max: 18 });
      user.ageOfYoungestChild = faker.number.int({
        min: 0,
        max: user.ageOfOldestChild,
      });
    }
  }

  user.sunniMadhaib = faker.helpers.arrayElement([
    'Hanafi',
    'Hanbali',
    'Maliki',
    'Shafi',
    'All Four',
  ]);

  user.religiousPractice = faker.helpers.arrayElement([
    'Not Practicing Never Prays/Non-Muslim',
    'Occasionally Practicing',
    'Practicing and Trying to Get Better',
    'Practicing/Fardh',
    'Very Practicing/Sunnah Nawafil Included',
  ]);

  user.bornOrRevertToIslam = faker.helpers.arrayElement([
    'Born Muslim',
    'Reverted to Islam',
  ]);

  user.drinks = faker.helpers.arrayElement([true, false]);
  user.drugs = faker.helpers.arrayElement([true, false]);
  user.smokes = faker.helpers.arrayElement([true, false]);
  user.tattoos = faker.helpers.arrayElement([
    'none',
    'minimal',
    'small',
    'large',
  ]);

  user.salah = faker.helpers.arrayElement([
    'fardh_and_sunnah',
    'complete_fardh',
    'frequent_salah',
    'occasional_salah',
    'irregular_salah',
    'do_not_pray',
  ]);

  user.children = user.hasChildren;
  user.education = faker.helpers.arrayElement([
    'high_school',
    'diploma',
    'non_degree_qualified',
    'bachelors_degree',
    'masters',
    'phd_doctorate',
    'currently_studying',
    'none_of_the_above',
  ]);
  user.employmentType = faker.helpers.arrayElement(
    [
      'employed',
      'self_employed',
      'business_owner_investor',
      'not_employed',
      'retired',
      'student',
      user.gender === Gender.FEMALE ? 'homemaker' : '',
    ].filter((field) => field !== ''),
  );

  if (user.gender === Gender.FEMALE) {
    user.hijab = faker.helpers.arrayElement([
      'advanced_hijab',
      'minimum_hijab',
      'partial_hijab',
      'no_hijab',
    ]);
  } else {
    user.beard = faker.helpers.arrayElement([
      'have_beard',
      'no_beard_by_choice',
      'no_beard_medical_reasons',
    ]);
  }

  return user;
});
