import { TemplateTypeEntity } from 'src/shared/pdfme-templates/entities/template-type.entity';
import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import { StorageEntity } from 'src/shared/storage/entities/storage.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('templates')
export class TemplateEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(
    () => TemplateTypeEntity,
    (templateType) => templateType.templates,
    {
      nullable: true,
      eager: true,
    },
  )
  @JoinColumn({ name: 'templateTypeId' })
  templateType?: TemplateTypeEntity;

  @Column({ nullable: true })
  templateTypeId?: string;

  @ManyToOne(() => StorageEntity, null, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'documentId' })
  document?: StorageEntity;

  @Column({ nullable: true })
  documentId?: number;

  @Column({ type: 'json', nullable: true })
  variables?: object;

  @Column({ type: 'json', nullable: true })
  backupVariables?: object;
}
