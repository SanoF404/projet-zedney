import { SocialTitles } from 'src/app/enums/social-titles.enum';
import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EnterpriseInterlocutorEntity } from './enterprise-interlocutor.entity';

@Entity('_interlocutor')
export class InterlocutorEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SocialTitles, nullable: true })
  title: SocialTitles;

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @OneToMany(
    () => EnterpriseInterlocutorEntity,
    (enterpriseInterlocutor) => enterpriseInterlocutor.interlocutor,
  )
  enterpriseInterlocutors: EnterpriseInterlocutorEntity[];
}
