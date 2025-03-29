import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { QuizController } from './quiz/quiz.controller';
import { QuizModule } from './quiz/quiz.module';
import { AuthModule } from './auth/auth.module';
import { QuizService } from './quiz/quiz.service';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { QuestionController } from './question/question.controller';
import { QuestionService } from './question/question.service';
import { QuestionModule } from './question/question.module';
import { ScoreService } from './score/score.service';
import { ScoreController } from './score/score.controller';
import { ScoreModule } from './score/score.module';
import { CategoryService } from './category/category.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    UserModule,
    QuizModule,
    AuthModule,
    CategoryModule,
    QuestionModule,
    ScoreModule,
  ],
  controllers: [
    QuizController,
    CategoryController,
    QuestionController,
    ScoreController,
  ],
  providers: [
    PrismaService,
    QuizService,
    QuestionService,
    ScoreService,
    CategoryService,
    UserService,
  ],
})
export class AppModule {}
