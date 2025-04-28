import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.validateUserName(createUserDto.username);
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return user;
  }

  async validateUserName(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user)
      throw new UnauthorizedException(`Username ${username} is already taken.`);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    await this.validateUserName(updateUserDto.username);
    await this.getUserById(id);
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: number) {
    await this.getUserById(id);
    await this.prisma.userQuizScore.deleteMany({ where: { userId: id } });
    return this.prisma.user.delete({ where: { id } });
  }
}
