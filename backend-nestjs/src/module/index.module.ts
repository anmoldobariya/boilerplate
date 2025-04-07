import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';

@Module({
  imports: [
    AuthModule,
  ]
})
export class IndexModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/login', 'auth/register')
      .forRoutes('*');
  }
}
