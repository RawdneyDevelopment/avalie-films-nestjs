import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OmdbService {
  private readonly apiKey: string = process.env.OMDB_API_KEY || 'aa9290ba';

  async fetchMovieData(title: string): Promise<any> {
    try {
      const response = await axios.get('http://www.omdbapi.com/', {
        params: {
          apikey: this.apiKey,
          t: title,
        },
      });

      if (response.data.Response === 'False') {
        throw new HttpException(response.data.Error, HttpStatus.NOT_FOUND);
      }

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar dados no OMDB',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}