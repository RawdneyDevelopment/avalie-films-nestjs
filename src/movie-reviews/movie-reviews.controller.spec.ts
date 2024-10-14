import { Test, TestingModule } from '@nestjs/testing';
import { MovieReviewsController } from './controllers/movie-reviews.controller';
import { MovieReviewsService } from './services/movie-reviews.service';
import { CreateMovieReviewDto } from './dto/create-movie-review.dto';

describe('MovieReviewsController', () => {
  let controller: MovieReviewsController;
  let service: MovieReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieReviewsController],
      providers: [
        {
          provide: MovieReviewsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MovieReviewsController>(MovieReviewsController);
    service = module.get<MovieReviewsService>(MovieReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create on the service', async () => {
    const dto: CreateMovieReviewDto = { title: 'Inception', notes: 'Great movie' };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  // Outros testes para findAll, findOne, update e remove...
});
