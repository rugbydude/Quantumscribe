import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto, ProjectResponseDto } from '../dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.projectRepository.find({
      relations: ['tasks', 'epics']
    });
    return projects;
  }

  async findOne(id: string): Promise<ProjectResponseDto> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks', 'epics']
    });
    
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    
    return project;
  }

  async create(projectDto: CreateProjectDto): Promise<ProjectResponseDto> {
    const newProject = this.projectRepository.create(projectDto);
    return this.projectRepository.save(newProject);
  }
}
