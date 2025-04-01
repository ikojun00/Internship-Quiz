import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    await this.getCategoryByName(createCategoryDto.name);
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found.`);
  }

  async getCategoryByName(name: string) {
    const category = await this.prisma.category.findUnique({
      where: { name },
    });
    if (category)
      throw new ForbiddenException(
        `Category with name ${name} has already been created.`,
      );
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.getCategoryById(id);
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    await this.getCategoryById(id);
    const quizzes = await this.prisma.quiz.findMany({
      where: { categoryId: id },
    });
    if (quizzes.length > 0) {
      throw new ForbiddenException(
        `Cannot delete category with ID ${id} because it has associated quizzes.`,
      );
    }
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
