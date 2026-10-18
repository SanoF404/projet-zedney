import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { ArticleFamilyEntity } from './entities/article-family.entity';
import { ArticleRepository } from './repositories/article.repository';
import { ArticleFamilyRepository } from './repositories/article-family.repository';
import { ArticleService } from './services/article.service';
import { ArticleFamilyService } from './services/article-family.service';

@Module({
  controllers: [],
  providers: [
    ArticleRepository,
    ArticleFamilyRepository,
    ArticleService,
    ArticleFamilyService,
  ],
  exports: [
    ArticleRepository,
    ArticleFamilyRepository,
    ArticleService,
    ArticleFamilyService,
  ],
  imports: [TypeOrmModule.forFeature([ArticleEntity, ArticleFamilyEntity])],
})
export class InventoryModule {}
