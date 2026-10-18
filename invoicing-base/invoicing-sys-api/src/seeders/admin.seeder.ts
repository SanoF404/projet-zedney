import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user-management/services/user.service';
import { adminSeed } from './data/admin.data';
import { RoleService } from 'src/shared/abstract-user-management/services/role.service';

@Injectable()
export class AdminSeederCommand {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Command({
    command: 'seed:admin',
    describe: 'seed system admin',
  })
  async seed() {
    const start = new Date();
    console.log('Starting seeding of admin');

    const role = await this.roleService.findOneByLabel('admin');

    let admin = await this.userService.findOneByUsername(adminSeed.username);

    if (!admin) {
      admin = await this.userService.save({ ...adminSeed, roleId: role?.id });
    }

    const end = new Date();
    console.log(`Seeding completed in ${end.getTime() - start.getTime()}ms`);
  }
}
