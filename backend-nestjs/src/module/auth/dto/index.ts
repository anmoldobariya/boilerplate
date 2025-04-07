import { IsEmail, IsString, MinLength } from 'class-validator';
import { ResponseBaseDto } from 'src/common/dtos/common.dto';

export class LoginDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString({ message: 'Name must be a string' })
  name: string;
}

export class UpdateUserDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;
}

export class LoginResDto extends ResponseBaseDto<{ token: string }> {}
