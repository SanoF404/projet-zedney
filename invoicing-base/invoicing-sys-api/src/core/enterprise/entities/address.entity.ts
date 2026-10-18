import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RefParamEntity } from 'src/shared/reference-types/entities/ref-param.entity';

@Entity('address')
export class AddressEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address2: string;

  @Column({ type: 'varchar', length: 255 })
  region: string;

  @Column({ type: 'int' })
  zipcode: number;

  @ManyToOne(() => RefParamEntity, { eager: true })
  @JoinColumn({ name: 'countryId' })
  country: RefParamEntity;

  @Column({ type: 'int' })
  countryId: number;
}
