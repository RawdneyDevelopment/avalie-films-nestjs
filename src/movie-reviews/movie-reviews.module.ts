import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieReview } from './entities/movie-review.entity';
import { MovieReviewsService } from './services/movie-reviews.service';
import { MovieReviewsController } from './controllers/movie-reviews.controller';
import { OmdbService } from './services/omdb.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieReview])],
  controllers: [MovieReviewsController],
  providers: [MovieReviewsService, OmdbService],
})
export class MovieReviewsModule {}