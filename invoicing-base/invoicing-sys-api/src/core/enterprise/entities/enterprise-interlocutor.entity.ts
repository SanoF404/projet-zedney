import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnterpriseEntity } from 'src/core/enterprise/entities/enterprise.entity';
import { InterlocutorEntity } from 'src/core/enterprise/entities/interlocutor.entity';

@Entity('enterprise_interlocutor')
export class EnterpriseInterlocutorEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EnterpriseEntity, (enterprise) => enterprise.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'enterpriseId' })
  enterprise: EnterpriseEntity;

  @Column()
  enterpriseId: number;

  @ManyToOne(() => InterlocutorEntity, (interlocutor) => interlocutor.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'interlocutorId' })
  interlocutor: InterlocutorEntity;

  @Column()
  interlocutorId: number;

  @Column({ type: 'boolean', default: false })
  main: boolean;

  @Column({ type: 'varchar', nullable: true })
  position: string;
}
