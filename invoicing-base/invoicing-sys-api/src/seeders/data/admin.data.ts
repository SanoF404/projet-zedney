import { UserEntity } from 'src/modules/user-management/entities/user.entity';
import { DeepPartial } from 'typeorm';

export const adminSeed: DeepPartial<UserEntity> = {
  username: 'superadmin',
  email: 'superadmin@example.com',
  password: 'superpassword',
  isActive: true,
  isApproved: true,
  firstName: 'Super$',
  lastName: 'Admin$',
};
