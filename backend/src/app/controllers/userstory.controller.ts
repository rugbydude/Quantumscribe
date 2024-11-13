import { Controller, Get, Post, Body, Param, UseGuards, Query, ValidationPipe } from '@nestjs/common';
import { UserStoryService } from '../services/userstory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserStoryDto, UserStoryResponseDto } from '../dto/userstory.dto';

@Controller('user-stories')
@UseGuards(JwtAuthGuard)
export class UserStoryController {
  constructor(private readonly userStoryService: UserStoryService) {}

  @Get()
  async findAll(@Query('epicId') epicId?: string): Promise<UserStoryResponseDto[]> {
    if (epicId) {
      return this.userStoryService.findByEpic(epicId);
    }
    return this.userStoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserStoryResponseDto> {
    return this.userStoryService.findOne(id);
  }

  @Post()
  async create(@Body(ValidationPipe) createUserStoryDto: CreateUserStoryDto): Promise<UserStoryResponseDto> {
    return this.userStoryService.create(createUserStoryDto);
  }
}
