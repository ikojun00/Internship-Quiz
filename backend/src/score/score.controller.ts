import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { CreateScoreDto } from './dto/createScore.dto';
import { ScoreService } from './score.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('scores')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new score' })
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @Get('summary')
  @ApiOperation({ summary: 'Get scores summary (Admin Only)' })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getTotalScores() {
    return this.scoreService.getTotalScoresForAllUsers();
  }

  @Get('my-rank')
  @ApiOperation({ summary: 'Get user rank' })
  async getUserRank(@Req() req) {
    const userId = req.user.sub;
    return this.scoreService.calculateUserRank(+userId);
  }
}
