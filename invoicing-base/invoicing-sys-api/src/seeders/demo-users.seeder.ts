import { randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { UserService } from 'src/modules/user-management/services/user.service';
import { RoleService } from 'src/shared/abstract-user-management/services/role.service';
import { hashPassword } from 'src/shared/helpers/hash.utils';

const demoUsers = [
  {
    username: 'demo.alice',
    email: 'alice@example.test',
    firstName: 'Alice',
    lastName: 'Demo',
  },
  {
    username: 'demo.marc',
    email: 'marc@example.test',
    firstName: 'Marc',
    lastName: 'Demo',
  },
  {
    username: 'demo.amina',
    email: 'amina@example.test',
    firstName: 'Amina',
    lastName: 'Demo',
  },
  {
    username: 'demo.noah',
    email: 'noah@example.test',
    firstName: 'Noah',
    lastName: 'Demo',
  },
  {
    username: 'demo.sofia',
    email: 'sofia@example.test',
    firstName: 'Sofia',
    lastName: 'Demo',
  },
];

@Injectable()
export class DemoUsersSeederCommand {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Command({
    command: 'seed:demo-users',
    describe: 'seed sample users for the local admin interface',
  })
  async seed() {
    const role = await this.roleService.findOneByLabel('standard-user');
    if (!role) {
      throw new Error('Run seed:roles before seeding demo users');
    }

    let created = 0;
    for (const user of demoUsers) {
      const existingByUsername =
        await this.userService.findOneByUsernameOrEmail(user.username);
      const existingByEmail =
        await this.userService.findOneByUsernameOrEmail(user.email);
      if (existingByUsername || existingByEmail) continue;

      const password = await hashPassword(randomBytes(32).toString('hex'));
      const seededUser = {
        ...user,
        password,
        roleId: role.id,
        isActive: true,
        isApproved: true,
      };
      await this.userService.save(seededUser);
      created += 1;
    }

    console.log(`Seeded ${created} demo user(s); existing users were kept.`);
  }
}
