import { EntityHelper } from 'src/shared/database/interfaces/database.entity.interface';
import { TemplateEntity } from 'src/shared/pdfme-templates/entities/template.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('template_types')
export class TemplateTypeEntity extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ type: 'json', nullable: true })
  variables?: object;

  @OneToMany(() => TemplateEntity, (template) => template.templateType)
  templates: TemplateEntity[];
}
