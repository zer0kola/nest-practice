import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Article } from './article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './article.repository';

@Module({
  // imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}

// module은 service, controller, repository를 모아놓은 곳
