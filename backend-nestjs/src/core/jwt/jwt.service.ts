import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService as JWTService } from '@nestjs/jwt';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { ERROR_MSG } from 'src/common/utils/constants';

@Injectable()
export class JwtService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(private readonly jwtService: JWTService) {
    const { JWT_SECRET, JWT_EXP_IN } = process.env;
    this.secret = JWT_SECRET as string;
    this.expiresIn = JWT_EXP_IN as string;
  }

  async signAsync(payload: any, expiresIn?: string): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.secret,
      expiresIn: expiresIn || this.expiresIn
    });
  }

  async verifyAsync(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.secret
      });

      return decoded;
    } catch (error) {
      if (error.name === ERROR_MSG.TOKEN_EXPIRED_ERROR) {
        throw new CustomException(
          ERROR_MSG.TOKEN_EXPIRED,
          HttpStatus.UNAUTHORIZED
        );
      } else {
        throw new CustomException(
          ERROR_MSG.UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED
        );
      }
    }
  }
}
