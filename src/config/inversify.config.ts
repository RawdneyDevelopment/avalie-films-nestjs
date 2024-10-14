import { Container } from 'inversify';
import { MovieReviewsService } from '../movie-reviews/services/movie-reviews.service';
import { OmdbService } from '../movie-reviews/services/omdb.service';
import { AppService } from '../app/app.service';
import { TYPES } from './types';

const container = new Container();

container.bind<AppService>(TYPES.AppService).to(AppService);
container.bind<MovieReviewsService>(TYPES.MovieReviewsService).to(MovieReviewsService);
container.bind<OmdbService>(TYPES.OmdbService).to(OmdbService);

export { container };
