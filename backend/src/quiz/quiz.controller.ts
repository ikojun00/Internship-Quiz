import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { UpdateQuizDto } from './dto/updateQuiz.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from '@prisma/client';

@ApiTags('Quiz')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz (Admin Only)' })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes (filtered by title)' })
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query('search') search?: string) {
    return this.quizService.getAllQuizzes(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by ID' })
  findOne(@Param('id') id: string) {
    return this.quizService.getQuizById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update quiz by ID (Admin Only)' })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.updateQuiz(+id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz by ID (Admin Only)' })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.quizService.deleteQuiz(+id);
  }
}
