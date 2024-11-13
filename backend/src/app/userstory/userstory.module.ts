import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStory } from '../entities/userstory.entity';
import { UserStoryService } from '../services/userstory.service';
import { UserStoryController } from '../controllers/userstory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserStory])],
  controllers: [UserStoryController],
  providers: [UserStoryService],
  exports: [UserStoryService],
})
export class UserStoryModule {}
