import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Project } from './project.entity';
import { UserStory } from './userstory.entity';

export enum EpicStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

@Entity()
export class Epic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: EpicStatus,
    default: EpicStatus.NOT_STARTED
  })
  status: EpicStatus;

  @ManyToOne(() => Project, project => project.epics)
  project: Project;

  @OneToMany(() => UserStory, userStory => userStory.epic)
  userStories: UserStory[];
}
