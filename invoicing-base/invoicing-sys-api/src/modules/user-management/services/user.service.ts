import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { AbstractUserService } from 'src/shared/abstract-user-management/services/abstract-user.service';

@Injectable()
export class UserService extends AbstractUserService {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  async approve(id: string): Promise<UserEntity | null> {
    const user = await this.findOneById(id);
    return this.userRepository.update(id, { ...user, isApproved: true });
  }

  async disapprove(id: string): Promise<UserEntity | null> {
    const user = await this.findOneById(id);
    return this.userRepository.update(id, { ...user, isApproved: false });
  }
}
