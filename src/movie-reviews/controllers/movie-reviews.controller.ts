import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MovieReviewsService } from '../services/movie-reviews.service';
import { CreateMovieReviewDto } from '../dto/create-movie-review.dto';
import { UpdateMovieReviewDto } from '../dto/update-movie-review.dto';
import { MovieReview } from '../entities/movie-review.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('movie-reviews')
@Controller('movie-reviews')
export class MovieReviewsController {
  constructor(private readonly movieReviewsService: MovieReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova anotação de filme' })
  @ApiResponse({ status: 201, description: 'Anotação criada com sucesso.', type: MovieReview })
  create(@Body() createDto: CreateMovieReviewDto): Promise<MovieReview> {
    return this.movieReviewsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as anotações de filmes' })
  @ApiResponse({ status: 200, description: 'Lista de anotações.', type: [MovieReview] })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'actors', required: false })
  @ApiQuery({ name: 'director', required: false })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['released', 'imdbRating'] })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  findAll(@Query() query: any): Promise<MovieReview[]> {
    return this.movieReviewsService.findAll(query);
  }

  @Get('most-viewed')
  @ApiOperation({ summary: 'Listar as anotações mais visualizadas' })
  @ApiResponse({ status: 200, description: 'Lista das anotações mais visualizadas.', type: [MovieReview] })
  findMostViewed(): Promise<MovieReview[]> {
    return this.movieReviewsService.findMostViewed();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma anotação específica por ID' })
  @ApiResponse({ status: 200, description: 'Anotação encontrada.', type: MovieReview })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MovieReview> {
    return this.movieReviewsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma anotação específica por ID' })
  @ApiResponse({ status: 200, description: 'Anotação atualizada.', type: MovieReview })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMovieReviewDto,
  ): Promise<MovieReview> {
    return this.movieReviewsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma anotação específica por ID' })
  @ApiResponse({ status: 204, description: 'Anotação deletada com sucesso.' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.movieReviewsService.remove(id);
  }
}
