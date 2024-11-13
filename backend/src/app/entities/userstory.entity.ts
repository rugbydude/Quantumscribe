import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Epic } from './epic.entity';

@Entity()
export class UserStory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  points: number;

  @ManyToOne(() => Epic, epic => epic.userStories)
  epic: Epic;
}
