import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from '../entities/sprint.entity';
import { SprintController } from '../controllers/sprint.controller';
import { SprintService } from '../services/sprint.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Sprint]),
        
    ],
    controllers: [SprintController],
    providers: [SprintService],
    exports: [SprintService]
})
export class SprintModule {}
