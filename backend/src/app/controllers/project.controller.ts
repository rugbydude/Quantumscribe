import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProjectDto, ProjectResponseDto } from '../dto/project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<ProjectResponseDto[]> {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
    return this.projectService.findOne(id);
  }

  @Post()
  async create(@Body(ValidationPipe) createProjectDto: CreateProjectDto): Promise<ProjectResponseDto> {
    return this.projectService.create(createProjectDto);
  }
}
