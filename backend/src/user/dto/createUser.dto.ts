import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password must be longer than or equal to 8 characters.',
  })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, {
    message:
      'Password needs to have at least one lowercase, one uppercase and one number character.',
  })
  password: string;

  @ApiProperty({ enum: Role, default: Role.USER })
  role?: Role;
}
