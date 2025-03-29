import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quizId: number;

  @ApiProperty()
  @IsInt()
  score: number;
}
