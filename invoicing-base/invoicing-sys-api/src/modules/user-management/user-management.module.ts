import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { StorageModule } from 'src/shared/storage/storage.module';
import { RoleRepository } from 'src/shared/abstract-user-management/repositories/role.repository';
import { PermissionRepository } from 'src/shared/abstract-user-management/repositories/permission.repository';
import { RolePermissionRepository } from 'src/shared/abstract-user-management/repositories/role-permission.repository';
import { RoleService } from 'src/shared/abstract-user-management/services/role.service';
import { PermissionService } from 'src/shared/abstract-user-management/services/permission.service';
import { RolePermissionService } from 'src/shared/abstract-user-management/services/role-permission.service';
import { RoleEntity } from 'src/shared/abstract-user-management/entities/role.entity';
import { PermissionEntity } from 'src/shared/abstract-user-management/entities/permission.entity';
import { RolePermissionEntity } from 'src/shared/abstract-user-management/entities/role-permission.entity';

@Module({
  controllers: [],
  providers: [
    UserRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,

    UserService,
    RoleService,
    PermissionService,
    RolePermissionService,
  ],
  exports: [
    UserService,
    RoleService,
    PermissionService,

    UserRepository,
    RoleRepository,
    PermissionRepository,
    RolePermissionRepository,
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      PermissionEntity,
      RolePermissionEntity,
    ]),
    StorageModule,
  ],
})
export class UserManagementModule {}
