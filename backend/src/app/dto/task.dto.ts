import { IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';

enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsUUID()
  projectId: string;

  @IsUUID()
  @IsOptional()
  assigneeId?: string;
}

export class UpdateTaskDto extends CreateTaskDto {}

export class TaskResponseDto extends CreateTaskDto {
  @IsUUID()
  id: string;
}
