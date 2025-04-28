import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { UserService } from '../user/user.service';
import { QuizService } from '../quiz/quiz.service';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [AuthModule],
  controllers: [ScoreController],
  providers: [ScoreService, UserService, QuizService, CategoryService, PrismaService],
})
export class ScoreModule {}
