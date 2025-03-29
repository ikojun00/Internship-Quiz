import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { QuestionType } from '@prisma/client';

export class CreateQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ enum: QuestionType })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  options: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  correctAnswer: string;

  @ApiProperty()
  @IsInt()
  points: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  quizId: number;
}
