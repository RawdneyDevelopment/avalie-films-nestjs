import { Test, TestingModule } from '@nestjs/testing';
import { MovieReviewsService } from './movie-reviews.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieReview } from '../entities/movie-review.entity';
import { OmdbService } from './omdb.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockMovieReviewRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
});

const mockOmdbService = () => ({
  fetchMovieData: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('MovieReviewsService', () => {
  let service: MovieReviewsService;
  let repository: MockRepository;
  let omdbService: OmdbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieReviewsService,
        { provide: getRepositoryToken(MovieReview), useFactory: mockMovieReviewRepository },
        { provide: OmdbService, useFactory: mockOmdbService },
      ],
    }).compile();

    service = module.get<MovieReviewsService>(MovieReviewsService);
    repository = module.get<MockRepository>(getRepositoryToken(MovieReview));
    omdbService = module.get<OmdbService>(OmdbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
