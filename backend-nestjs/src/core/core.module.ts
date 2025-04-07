import { Module } from '@nestjs/common';
import { JwtModule } from './jwt/jwt.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [JwtModule, PrismaModule]
})
export class CoreModule {}
