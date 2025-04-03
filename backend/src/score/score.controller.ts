import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Req,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { CreateScoreDto } from './dto/createScore.dto';
import { ScoreService } from './score.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateScoreDto } from './dto/updateScore.dto';

@Controller('scores')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get scores summary (Admin Only)' })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  getTotalScores() {
    return this.scoreService.getTotalScores();
  }

  @Get('my-rank')
  @ApiOperation({ summary: 'Get user rank' })
  getUserRank(@Req() req) {
    const userId = req.user.sub;
    return this.scoreService.calculateUserRank(+userId);
  }

  @Get(':quizId')
  @ApiOperation({ summary: 'Get score by quizId' })
  getScore(@Req() req, @Param('quizId') quizId: string) {
    return this.scoreService.getScore(req.user.sub, +quizId);
  }

  @Post(':quizId')
  @ApiOperation({ summary: 'Create a new score' })
  createScore(
    @Req() req,
    @Param('quizId') quizId: string,
    @Body() createScoreDto: CreateScoreDto,
  ) {
    return this.scoreService.createScore(
      req.user.sub,
      +quizId,
      createScoreDto.score,
    );
  }

  @Patch(':quizId')
  @ApiOperation({ summary: 'Update score by quizId' })
  updateScore(
    @Req() req,
    @Param('quizId') quizId: string,
    @Body() updateScoreDto: UpdateScoreDto,
  ) {
    return this.scoreService.updateScore(
      req.user.sub,
      +quizId,
      updateScoreDto.score,
    );
  }
}
