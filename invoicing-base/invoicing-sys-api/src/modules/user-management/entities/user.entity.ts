import { ChildEntity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractUserEntity } from 'src/shared/abstract-user-management/entities/abstract-user.entity';
import { StorageEntity } from 'src/shared/storage/entities/storage.entity';
import { Gender } from 'src/shared/abstract-user-management/enums/gender.enum';

@ChildEntity()
export class UserEntity extends AbstractUserEntity {
  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @ManyToOne(() => StorageEntity, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'pictureId' })
  picture?: StorageEntity;

  @Column({ nullable: true })
  pictureId?: number;

  @Column({ nullable: true })
  isApproved?: boolean;
}
