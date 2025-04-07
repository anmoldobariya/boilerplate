import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR_MSG } from 'src/common/utils/constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : ERROR_MSG.INTERNAL_SERVER_ERROR;

    const errorResponse: any = {
      status_code: status,
      error: true,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method
    };

    if (process.env.NODE_ENV !== 'prod') {
      console.error('🚨 Error Details:', exception);
    }

    return response.status(status).json({
      status_code: status,
      error: true,
      message
    });
  }
}
