import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index('IDX_ARTICLE_TITLE', ['title']) // title 컬럼에 인덱스 설정
@Index('IDX_ARTICLE_AUTHOR_ID', ['authorId']) // authorId 컬럼에 인덱스 설정
@Index('IDX_ARTICLE_TITLE_AUTHOR_ID', ['title', 'authorId'], { unique: true }) // title과 authorId 유니크 인덱스 설정
export class Article {
  // 기본키 설정
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({
    type: 'int',
    name: 'author_id',
    nullable: false,
  })
  authorId: number;
}
