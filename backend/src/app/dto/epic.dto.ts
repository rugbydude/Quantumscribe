import { IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';

enum EpicStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export class CreateEpicDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(EpicStatus)
  status: EpicStatus;

  @IsUUID()
  projectId: string;
}

export class UpdateEpicDto extends CreateEpicDto {}

export class EpicResponseDto extends CreateEpicDto {
  @IsUUID()
  id: string;
}
