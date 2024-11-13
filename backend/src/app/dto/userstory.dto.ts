import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateUserStoryDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  points: number;

  @IsUUID()
  epicId: string;

  @IsUUID()
  @IsOptional()
  sprintId?: string;
}

export class UpdateUserStoryDto extends CreateUserStoryDto {}

export class UserStoryResponseDto extends CreateUserStoryDto {
  @IsUUID()
  id: string;
}
