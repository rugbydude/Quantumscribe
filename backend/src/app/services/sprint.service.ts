import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Sprint } from '../entities/sprint.entity';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint)
    private sprintRepository: Repository<Sprint>
  ) {}

  async findOverlappingSprints(startDate: Date, endDate: Date): Promise<Sprint[]> {
    return this.sprintRepository.find({
      where: [
        {
          startDate: LessThanOrEqual(endDate),
          endDate: MoreThanOrEqual(startDate)
        }
      ]
    });
  }
}
