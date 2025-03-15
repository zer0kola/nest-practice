import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleRepository } from './article.repository';

// service는 비즈니스 로직을 작성하는 곳
@Injectable()
export class ArticleService {
  // 생성자 주입
  constructor(private readonly articleRepository: ArticleRepository) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article | null> {
    return this.articleRepository.findOne({ where: { id } });
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    await this.articleRepository.update(id, updateArticleDto);
    return this.articleRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.articleRepository.remove(id);
  }
}
