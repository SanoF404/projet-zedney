import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/shared/abstract-user-management/services/role.service';
import { PermissionService } from 'src/shared/abstract-user-management/services/permission.service';

@Injectable()
export class RolesSeederCommand {
  constructor(
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
  ) {}

  @Command({
    command: 'seed:roles',
    describe: 'seed system roles',
  })
  async seed() {
    const start = new Date();
    console.log('Starting seeding of roles');

    const permissions = await this.permissionService.findAll();

    const roles = [
      {
        label: 'admin',
        description: 'This role is for admin users',
        permissions: permissions.map((p) => ({
          permissionId: p.id,
        })),
      },
      {
        label: 'standard-user',
        description: 'This role is for standard users',
        permissions: [],
      },
    ];

    for (const role of roles) {
      if (await this.roleService.findOneByLabel(role.label)) continue;
      await this.roleService.saveWithPermissions(role);
    }

    const end = new Date();
    console.log(`Seeding completed in ${end.getTime() - start.getTime()}ms`);
  }
}
