import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @ApiOperation({ summary: 'Update user by ID' })
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(req.user.sub, updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user by ID' })
  remove(@Req() req) {
    return this.userService.deleteUser(req.user.sub);
  }
}
