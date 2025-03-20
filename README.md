# NestJS

## 프로젝트 소개

Nest server project

## 기술 스택

- NestJS
- TypeORM
- PostgreSQL
- TypeScript

## 주요 기능

- CRUD 기능
- 데이터베이스 마이그레이션 관리
- CORS 설정 (로컬 프론트엔드 개발 환경 지원)

### 데이터베이스 마이그레이션

```bash
# 마이그레이션 실행
npm run migration:run

# 마이그레이션 생성
npm run migration:generate --name=migration-name

# 마이그레이션 파일 생성 (빈 파일)
npm run migration:create --name=migration-name

# 마이그레이션 취소
npm run migration:revert

# 마이그레이션 상태 확인
npm run migration:show
```
