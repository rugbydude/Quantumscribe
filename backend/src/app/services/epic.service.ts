import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Epic } from '../entities/epic.entity';

@Injectable()
export class EpicService {
  constructor(
    @InjectRepository(Epic)
    private epicRepository: Repository<Epic>
  ) {}

  async findAll(): Promise<Epic[]> {
    return this.epicRepository.find();
  }

  async findOne(id: string): Promise<Epic> {
    return this.epicRepository.findOneBy({ id });
  }

  async create(epic: Partial<Epic>): Promise<Epic> {
    const newEpic = this.epicRepository.create(epic);
    return this.epicRepository.save(newEpic);
  }

  async findByProject(projectId: string): Promise<Epic[]> {
    return this.epicRepository.find({
      where: { project: { id: projectId } },
      relations: ['userStories']
    });
  }
}
