import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movie_reviews')
export class MovieReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  notes: string;

  @Column()
  released: string;

  @Column('decimal', { precision: 3, scale: 1 })
  imdbRating: number;

  @Column({ nullable: true })
  actors: string;

  @Column({ nullable: true })
  director: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  views: number;
}