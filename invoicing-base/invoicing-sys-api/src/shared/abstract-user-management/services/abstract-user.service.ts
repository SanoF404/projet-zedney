import { Injectable } from '@nestjs/common';
import { hashPassword } from 'src/shared/helpers/hash.utils';
import { AbstractUserEntity } from '../entities/abstract-user.entity';
import { DatabaseAbstractRepository } from 'src/shared/database/repositories/database.repository';
import { AbstractCrudService } from 'src/shared/database/services/abstract-crud.service';

@Injectable()
export abstract class AbstractUserService extends AbstractCrudService<AbstractUserEntity> {
  private abstractUserRepository: DatabaseAbstractRepository<AbstractUserEntity>;
  constructor(
    abstractUserRepository: DatabaseAbstractRepository<AbstractUserEntity>,
  ) {
    super(abstractUserRepository);
    this.abstractUserRepository = abstractUserRepository;
  }

  //Extended Methods ===========================================================================

  async findOneByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<AbstractUserEntity | null | undefined> {
    return this.abstractUserRepository.findOne({
      where: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
  }

  async findOneByEmail(
    email: string,
  ): Promise<AbstractUserEntity | null | undefined> {
    return this.abstractUserRepository.findOne({
      where: { email },
    });
  }

  async findOneByUsername(
    username: string,
  ): Promise<AbstractUserEntity | null | undefined> {
    return this.abstractUserRepository.findOne({
      where: { username },
    });
  }

  async activate(id: string): Promise<AbstractUserEntity | null | undefined> {
    return this.abstractUserRepository.update(id, { isActive: true });
  }

  async deactivate(id: string): Promise<AbstractUserEntity | null | undefined> {
    return this.abstractUserRepository.update(id, {
      isActive: false,
    });
  }

  async changePassword(
    id: string,
    password: string,
  ): Promise<AbstractUserEntity | null | undefined> {
    const user = await this.findOneById(id);
    const hashedPassword = await hashPassword(password);
    return this.abstractUserRepository.update(id, {
      ...user,
      password: hashedPassword,
    });
  }
}
