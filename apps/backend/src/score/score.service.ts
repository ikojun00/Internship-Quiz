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

  async getScore(userId: number, quizId: number) {
    await this.userService.getUserById(userId);
    await this.quizService.getQuizById(quizId);

    return await this.prisma.userQuizScore.findFirst({
      where: {
        userId,
        quizId,
      },
    });
  }

  async createScore(userId: number, quizId: number, score: number) {
    const existingScore = await this.getScore(userId, quizId);
    if (existingScore) {
      throw new ForbiddenException('User already has a score for this quiz.');
    }

    return this.prisma.userQuizScore.create({
      data: {
        userId,
        quizId,
        score,
      },
    });
  }

  async updateScore(userId: number, quizId: number, score: number) {
    const existingScore = await this.getScore(userId, quizId);

    if (!existingScore) {
      throw new Error(
        `Score for userId ${userId} and quizId ${quizId} not found.`,
      );
    }

    return this.prisma.userQuizScore.update({
      where: { id: existingScore.id },
      data: { score },
    });
  }

  async getTotalScores() {
    const scores = await this.prisma.userQuizScore.groupBy({
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

    const validScores = scores.filter((score) => score._sum.score !== null);

    return await Promise.all(
      validScores.map(async (score) => {
        try {
          const user = await this.userService.getUserById(score.userId);
          return {
            user,
            totalScore: score._sum.score,
          };
        } catch (error) {
          console.error(
            `User not found for score entry: userId=${score.userId}`,
            error,
          );
          return null;
        }
      }),
    ).then((results) => results.filter((result) => result !== null));
  }

  async calculateUserRank(userId: number) {
    const allGroupedScores = await this.prisma.userQuizScore.groupBy({
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

    const rankedPlayers = allGroupedScores.filter((s) => s._sum.score !== null);
    const totalPlayers = rankedPlayers.length;

    let userRank = -1;
    let userTotalScore = 0;
    let currentRank = 0;
    let lastScore = Infinity;

    for (let i = 0; i < rankedPlayers.length; i++) {
      const entry = rankedPlayers[i];
      const currentScore = entry._sum.score;

      if (currentScore < lastScore) {
        currentRank = i + 1;
        lastScore = currentScore;
      }

      if (entry.userId === userId) {
        userRank = currentRank;
        userTotalScore = currentScore;
        break;
      }
    }

    if (userRank === -1) {
      return {
        rank: totalPlayers + 1,
        totalScore: 0,
        totalPlayers: totalPlayers,
      };
    }

    return {
      rank: userRank,
      totalScore: userTotalScore,
      totalPlayers: totalPlayers,
    };
  }
}
