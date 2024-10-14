import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieReviewDto } from './create-movie-review.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateMovieReviewDto extends PartialType(CreateMovieReviewDto) {
  @ApiPropertyOptional({
    description: 'Título do filme',
    example: "Assassin's Creed",
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Minhas anotações sobre o filme',
    example: 'Excelente adaptação dos jogos...',
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
