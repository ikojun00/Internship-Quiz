import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { UpdateQuizDto } from './dto/updateQuiz.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class QuizService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    await this.categoryService.getCategoryById(createQuizDto.categoryId);
    return this.prisma.quiz.create({
      data: createQuizDto,
    });
  }

  async getAllQuizzes(search?: string, categoryId?: number) {
    return this.prisma.quiz.findMany({
      where: {
        title: search ? { contains: search } : undefined,
        categoryId: categoryId ? categoryId : undefined,
      },
      include: { category: true },
    });
  }

  async getQuizById(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { category: true, questions: true },
    });
    if (!quiz) throw new NotFoundException(`Quiz with ID ${id} not found`);
    return quiz;
  }

  async updateQuiz(id: number, updateQuizDto: UpdateQuizDto) {
    await this.getQuizById(id);
    return this.prisma.quiz.update({
      where: { id },
      data: updateQuizDto,
    });
  }

  async deleteQuiz(id: number) {
    await this.getQuizById(id);
    await this.prisma.question.deleteMany({ where: { quizId: id } });
    return this.prisma.quiz.delete({ where: { id } });
  }
}
