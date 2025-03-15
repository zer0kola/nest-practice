import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

// '/articles' endpoint로 요청이 들어오면 이 컨트롤러가 처리
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe는 문자열을 숫자로 변환
    // spring에서 @PathVariable 역할
    return this.articleService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) createArticleDto: CreateArticleDto) {
    // ValidationPipe는 body에 있는 데이터가 CreateArticleDto 타입에 맞는지 검증
    // spring에서 @RequestBody 역할
    return this.articleService.create(createArticleDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.delete(id);
  }
}
