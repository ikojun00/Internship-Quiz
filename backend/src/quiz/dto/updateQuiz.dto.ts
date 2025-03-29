import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateQuizDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
