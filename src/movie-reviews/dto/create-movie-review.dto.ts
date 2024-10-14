import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieReviewDto {
  @ApiProperty({
    description: 'Título do filme',
    example: "Assassin's Creed",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Minhas anotações sobre o filme',
    example: 'Excelente adaptação dos jogos...',
  })
  @IsString()
  @IsNotEmpty()
  notes: string;
}