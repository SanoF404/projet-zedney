import { SocialTitles } from 'src/app/enums/social-titles.enum';
import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import { FirmInterlocutorEntryEntity } from 'src/modules/firm-interlocutor-entry/entities/firm-interlocutor-entry.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity('interlocutor')
export class InterlocutorEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SocialTitles, nullable: true })
  title: SocialTitles;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  surname: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @OneToMany(() => FirmInterlocutorEntryEntity, (entry) => entry.interlocutor)
  @JoinTable()
  firmsToInterlocutor: FirmInterlocutorEntryEntity[];
}
