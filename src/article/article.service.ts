import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

// service는 비즈니스 로직을 작성하는 곳
@Injectable()
export class ArticleService {
  // 생성자 주입
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article | null> {
    return this.articleRepository.findOne({ where: { id } });
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const article = this.articleRepository.create(createArticleDto);
      return this.articleRepository.save(article);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          '해당 제목과 작성자를 가진 게시글이 이미 존재합니다.',
        );
      }
      throw error;
    }
  }

  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    try {
      const article = await this.articleRepository.findOne({ where: { id } });
      if (!article) {
        throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
      }
      await this.articleRepository.update(id, updateArticleDto);
      return this.articleRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const result = await this.articleRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
      }
    } catch (error) {
      throw error;
    }
  }
}
