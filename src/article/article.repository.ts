import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';

@Injectable()
export class ArticleRepository {
  private articles: Article[] = [];
  private idCounter = 1;

  find(): Article[] {
    return this.articles;
  }

  findOne({ where: { id } }: { where: { id: number } }): Article | null {
    return this.articles.find((article) => article.id === id) || null;
  }

  create(model): Article {
    const newArticle: Article = { id: this.idCounter++, ...model };
    this.articles.push(newArticle);
    return newArticle;
  }

  save(article: Article): Article {
    const index = this.articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      this.articles[index] = article;
    } else {
      this.articles.push(article);
    }
    return article;
  }

  update(id: number, model): void {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index !== -1) {
      this.articles[index] = { ...this.articles[index], ...model };
    }
  }

  remove(id: number): void {
    this.articles = this.articles.filter((article) => article.id !== id);
  }
}

// repository는 데이터베이스 조작을 담당하는 곳
// 이 코드는 임시, 실제 데이터베이스를 연결하고, typeORM으로 대체한다
