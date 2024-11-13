import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Epic } from '../entities/epic.entity';
import { EpicController } from '../controllers/epic.controller';
import { EpicService } from '../services/epic.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Epic]),
        
    ],
    controllers: [EpicController],
    providers: [EpicService],
    exports: [EpicService]
})
export class EpicModule {}
