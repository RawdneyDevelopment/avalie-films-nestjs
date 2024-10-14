import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMovieReviewTable168XYZ implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'movie_reviews',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'title',
              type: 'varchar',
            },
            {
              name: 'notes',
              type: 'text',
            },
            {
              name: 'released',
              type: 'varchar',
            },
            {
              name: 'imdbRating',
              type: 'decimal',
              precision: 3,
              scale: 1,
            },
            {
              name: 'actors',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'director',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'views',
              type: 'int',
              default: 0,
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('movie_reviews');
    }
  }