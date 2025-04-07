import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested
} from 'class-validator';

export class ResponseDto {
  @IsInt()
  status_code: number;

  @IsBoolean()
  error: boolean;

  @IsString()
  message: string;

  constructor(response: {
    status_code: number;
    error: boolean;
    message: string;
  }) {
    this.status_code = response.status_code;
    this.error = response.error;
    this.message = response.message;
  }
}

export class ResponseBaseDto<T> extends ResponseDto {
  @Type(() => Object)
  result: T;

  constructor(response: {
    status_code: number;
    error: boolean;
    message: string;
    result: T;
  }) {
    super({
      status_code: response.status_code,
      error: response.error,
      message: response.message
    });
    this.result = response.result;
  }
}

export class ResponseBaseWithCountDto<T> extends ResponseDto {
  @ValidateNested({ each: true })
  @Type(() => Object)
  result: {
    data: T[];
    count: number;
  };

  constructor(response: {
    status_code: number;
    error: boolean;
    message: string;
    result: {
      data: T[];
      count: number;
    };
  }) {
    super({
      status_code: response.status_code,
      error: response.error,
      message: response.message
    });
    this.result = response.result;
  }
}

export class RequestQueryDto {
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  page?: number;

  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  limit?: number;

  @IsOptional()
  search?: string;
}
