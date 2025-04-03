import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty()
  @IsInt()
  score: number;
}
