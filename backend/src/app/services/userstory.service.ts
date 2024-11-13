import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStory } from '../entities/userstory.entity';

@Injectable()
export class UserStoryService {
  constructor(
    @InjectRepository(UserStory)
    private userStoryRepository: Repository<UserStory>
  ) {}

  async findAll(): Promise<UserStory[]> {
    return this.userStoryRepository.find();
  }

  async findOne(id: string): Promise<UserStory> {
    return this.userStoryRepository.findOneBy({ id });
  }

  async create(userStory: Partial<UserStory>): Promise<UserStory> {
    const newUserStory = this.userStoryRepository.create(userStory);
    return this.userStoryRepository.save(newUserStory);
  }

  async findByEpic(epicId: string): Promise<UserStory[]> {
    return this.userStoryRepository.find({
      where: { epic: { id: epicId } },
      relations: ['tasks']
    });
  }
}
