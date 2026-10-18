import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleFamilyEntity } from './article-family.entity';

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @ManyToOne(
    () => ArticleFamilyEntity,
    (articleFamily) => articleFamily.articles,
  )
  @JoinColumn({ name: 'articleFamilyId' })
  articleFamily: ArticleFamilyEntity;

  @Column({ type: 'int', nullable: true })
  articleFamilyId: number;
}
