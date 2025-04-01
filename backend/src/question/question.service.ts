import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';
import { CreateQuestionDto } from './dto/createQuestion.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  create(createQuestionDto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: createQuestionDto,
    });
  }

  async findOne(id: number) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: { quiz: true },
    });
    if (!question)
      throw new NotFoundException(`Question with ID ${id} not found.`);
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    await this.findOne(id);
    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
