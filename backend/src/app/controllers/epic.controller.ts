import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { EpicService } from '../services/epic.service';
import { Epic } from '../entities/epic.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('epics')
@UseGuards(JwtAuthGuard)
export class EpicController {
  constructor(private readonly epicService: EpicService) {}

  @Get()
  findAll(@Query('projectId') projectId?: string): Promise<Epic[]> {
    if (projectId) {
      return this.epicService.findByProject(projectId);
    }
    return this.epicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Epic> {
    return this.epicService.findOne(id);
  }

  @Post()
  create(@Body() epic: Partial<Epic>): Promise<Epic> {
    return this.epicService.create(epic);
  }
}
