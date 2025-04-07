import { Global, Module } from '@nestjs/common';
import { JwtService as JWTService } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Global()
@Module({
  providers: [JWTService, JwtService],
  exports: [JwtService]
})
export class JwtModule {}
