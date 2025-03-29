import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateScoreDto } from './dto/createScore.dto';
import { UserService } from 'src/user/user.service';
import { QuizService } from 'src/quiz/quiz.service';

@Injectable()
export class ScoreService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private quizService: QuizService,
  ) {}

  async create(createScoreDto: CreateScoreDto) {
    await this.userService.getUserById(createScoreDto.userId);
    await this.quizService.getQuizById(createScoreDto.quizId);

    const existingScore = await this.prisma.userQuizScore.findFirst({
      where: {
        userId: createScoreDto.userId,
        quizId: createScoreDto.quizId,
      },
    });

    if (existingScore) {
      throw new ForbiddenException('User already has a score for this quiz');
    }

    return this.prisma.userQuizScore.create({
      data: createScoreDto,
    });
  }

  async getTotalScoresForAllUsers() {
    return this.prisma.userQuizScore.groupBy({
      by: ['userId'],
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: 'desc',
        },
      },
    });
  }

  async calculateUserRank(userId: number) {
    const allScores = await this.prisma.userQuizScore.groupBy({
      by: ['userId'],
      _sum: {
        score: true,
      },
      orderBy: {
        _sum: {
          score: 'desc',
        },
      },
    });

    const userTotal = await this.prisma.userQuizScore.aggregate({
      where: { userId },
      _sum: {
        score: true,
      },
    });

    if (!userTotal._sum.score) {
      throw new NotFoundException('User has no scores yet');
    }

    let rank = 1;
    let previousScore = Infinity;

    for (const [index, score] of allScores.entries()) {
      if (score._sum.score < previousScore) {
        rank = index + 1;
        previousScore = score._sum.score;
      }

      if (score.userId === userId) {
        return {
          userId,
          totalScore: userTotal._sum.score,
          rank,
        };
      }
    }

    throw new NotFoundException('User ranking not found');
  }
}

/*rolesGuard dodati na admin endpointe

req bi treba imati type */
