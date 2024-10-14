import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MovieReviewsModule } from './movie-reviews/movie-reviews.module';
import { DataSource } from 'typeorm';
import typeOrmConfig from './config/typeorm.config';

export const AppDataSource = new DataSource(typeOrmConfig);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig,
    }),
    MovieReviewsModule,
  ],
})
export class AppModule {}
