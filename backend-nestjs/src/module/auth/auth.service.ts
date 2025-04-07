import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { LoginDto, LoginResDto, RegisterDto, UpdateUserDto } from './dto';
import {
  comparePassword,
  encryptPassword,
  successResponse,
  successResponseWithResult
} from 'src/common/utils/helper';
import {
  ERROR_MSG,
  RESOURCE_NAME,
  SUCCESS_MSG
} from 'src/common/utils/constants';
import {
  CustomException,
  ResourceNotFound
} from 'src/common/exceptions/custom.exception';
import { ResponseDto } from 'src/common/dtos/common.dto';
import { JwtService } from 'src/core/jwt/jwt.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(body: RegisterDto): Promise<ResponseDto> {
    const existingUser = await this.findByEmail(body.email);
    if (existingUser) throw new CustomException(ERROR_MSG.EMAIL_EXISTS);

    body.password = await encryptPassword(body.password);
    await this.prisma.user.create({ data: body });

    return successResponse(SUCCESS_MSG.REGISTERED);
  }

  async login(body: LoginDto): Promise<LoginResDto> {
    const user = await this.findByEmail(body.email);
    if (!user) throw new ResourceNotFound(RESOURCE_NAME.USER);

    if (!(await comparePassword(body.password, user.password)))
      throw new CustomException(ERROR_MSG.INVALID_PASSWORD);

    const token = await this.jwtService.signAsync({ id: user.id });
    return successResponseWithResult(SUCCESS_MSG.LOG_IN, { token });
  }

  profile(user: Partial<User>) {
    return successResponseWithResult(SUCCESS_MSG.FETCHED, user);
  }

  async verifyToken(token: string): Promise<Partial<User>> {
    const { id } = await this.jwtService.verifyAsync(token);
    return this.findById(id);
  }

  async update(data: UpdateUserDto, id: number): Promise<ResponseDto> {
    await this.findById(id);

    const existingUser = await this.findByEmail(data.email);
    if (existingUser && existingUser.id !== id)
      throw new CustomException(ERROR_MSG.EMAIL_EXISTS);

    await this.prisma.user.update({ where: { id }, data });
    return successResponse(SUCCESS_MSG.UPDATED);
  }

  private async findById(id: number): Promise<Partial<User>> {
    const user = await this.prisma.user.findUnique({
      where: { id, isDeleted: false },
      select: { id: true, name: true, email: true }
    });
    if (!user) throw new ResourceNotFound(RESOURCE_NAME.USER);
    return user;
  }

  private async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
