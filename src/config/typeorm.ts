import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST || 'localhost'}`,
  port: parseInt(`${process.env.DB_PORT || 5432}`, 10),
  username: `${process.env.DB_USERNAME || 'test'}`,
  password: `${process.env.DB_PASSWORD || 'test'}`,
  database: `${process.env.DB_DATABASE || 'inflearn'}`,
  entities: ['dist/**/**/*.entity.{js,ts}'],
  migrations: ['dist/migrations/*.js'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);

export const typeOrmConfig = new DataSource(config as DataSourceOptions);
