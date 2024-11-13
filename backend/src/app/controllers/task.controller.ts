import { Controller, Get, Post, Body, Param, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto, TaskResponseDto } from '../dto/task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(@Query('projectId') projectId?: string): Promise<TaskResponseDto[]> {
    if (projectId) {
      return this.taskService.findByProject(projectId);
    }
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskResponseDto> {
    return this.taskService.findOne(id);
  }

  @Post()
  async create(@Body(ValidationPipe) createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    return this.taskService.create(createTaskDto);
  }
}
