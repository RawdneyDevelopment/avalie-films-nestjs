import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { MovieReview } from '../entities/movie-review.entity';
import { CreateMovieReviewDto } from '../dto/create-movie-review.dto';
import { UpdateMovieReviewDto } from '../dto/update-movie-review.dto';
import { OmdbService } from './omdb.service';

@Injectable()
export class MovieReviewsService {
  constructor(
    @InjectRepository(MovieReview)
    private movieReviewsRepository: Repository<MovieReview>,
    private omdbService: OmdbService,
  ) {}

  async create(createDto: CreateMovieReviewDto): Promise<MovieReview> {
    const omdbData = await this.omdbService.fetchMovieData(createDto.title);

    const movieReview = this.movieReviewsRepository.create({
      title: createDto.title,
      notes: createDto.notes,
      released: omdbData.Released,
      imdbRating: parseFloat(omdbData.imdbRating),
      actors: omdbData.Actors,
      director: omdbData.Director,
    });

    return this.movieReviewsRepository.save(movieReview);
  }

  async findAll(query: any): Promise<MovieReview[]> {
    const { title, actors, director, sortBy, order } = query;

    const where: any = {};
    if (title) where.title = Like(`%${title}%`);
    if (actors) where.actors = Like(`%${actors}%`);
    if (director) where.director = Like(`%${director}%`);

    const orderOptions: any = {};
    if (sortBy) {
      const sortOrder = order === 'desc' ? 'DESC' : 'ASC';
      orderOptions[sortBy] = sortOrder;
    }

    return this.movieReviewsRepository.find({
      where,
      order: orderOptions,
    });
  }

  async findOne(id: number): Promise<MovieReview> {
    const movieReview = await this.movieReviewsRepository.findOne({ where: { id } });
    if (!movieReview) {
      throw new NotFoundException(`MovieReview with ID ${id} not found`);
    }

    movieReview.views += 1;
    await this.movieReviewsRepository.save(movieReview);

    return movieReview;
  }

  async update(id: number, updateDto: UpdateMovieReviewDto): Promise<MovieReview> {
    const movieReview = await this.findOne(id);
    Object.assign(movieReview, updateDto);
    return this.movieReviewsRepository.save(movieReview);
  }

  async remove(id: number): Promise<void> {
    const movieReview = await this.findOne(id);
    await this.movieReviewsRepository.remove(movieReview);
  }

  async findMostViewed(): Promise<MovieReview[]> {
    return this.movieReviewsRepository.find({
      order: { views: 'DESC' },
    });
  }
}
