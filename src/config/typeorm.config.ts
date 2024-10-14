import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MovieReview } from '../movie-reviews/entities/movie-review.entity';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT as string, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'movie_reviews',
  entities: [MovieReview],
  migrations: [path.join(__dirname, '..', 'migrations', '*.ts')],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
  migrationsRun: true,
};

export default typeOrmConfig;