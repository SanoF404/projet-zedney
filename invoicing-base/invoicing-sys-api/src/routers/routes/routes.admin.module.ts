import { Module } from '@nestjs/common';
import { UserController } from 'src/modules/user-management/controllers/user.controller';
import { UserManagementModule } from 'src/modules/user-management/user-management.module';
import { PermissionController } from 'src/shared/abstract-user-management/controllers/permission.controller';
import { RoleController } from 'src/shared/abstract-user-management/controllers/role.controller';
import { ConfigurationsModule } from 'src/shared/configurations/configurations.module';
import { ConfigurationController } from 'src/shared/configurations/controllers/configuration.controller';
import { LoggerController } from 'src/shared/logger/controller/logger.controller';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { StoreController } from 'src/shared/store/controllers/store.controller';
import { StoreModule } from 'src/shared/store/store.module';

@Module({
  controllers: [
    UserController,
    RoleController,
    PermissionController,
    ConfigurationController,
    LoggerController,
    StoreController,
  ],
  providers: [],
  exports: [],
  imports: [
    ConfigurationsModule,
    LoggerModule,
    StoreModule,
    UserManagementModule,
  ],
})
export class RoutesAdminModule {}
