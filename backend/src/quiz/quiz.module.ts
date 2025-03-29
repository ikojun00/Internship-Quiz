import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { PrismaService } from 'src/prisma.service';
import { QuizController } from './quiz.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [AuthModule],
  controllers: [QuizController],
  providers: [QuizService, CategoryService, PrismaService],
})
export class QuizModule {}
