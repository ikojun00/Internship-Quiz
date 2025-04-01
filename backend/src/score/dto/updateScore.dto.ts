import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateScoreDto {
  @ApiProperty()
  @IsInt()
  score: number;
}
