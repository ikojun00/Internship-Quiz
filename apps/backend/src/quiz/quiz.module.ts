import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { PrismaService } from '../prisma.service';
import { QuizController } from './quiz.controller';
import { AuthModule } from '../auth/auth.module';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [AuthModule],
  controllers: [QuizController],
  providers: [QuizService, CategoryService, PrismaService],
})
export class QuizModule {}
