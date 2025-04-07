import { HttpStatus } from '@nestjs/common';
import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 10);

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => await bcrypt.compare(password, hash);

export function checkEnvVariables(requiredEnvVars: string[]) {
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      console.error(
        `\x1b[31mMissing required environment variable: ${envVar}\x1b[0m`
      );
      process.exit(1);
    }
  });
}

export const successResponse = <T>(message: string) =>
  ({
    status_code: HttpStatus.OK,
    error: false,
    message
  }) as const;

export const successResponseWithResult = <T>(message: string, result: T) =>
  ({
    status_code: HttpStatus.OK,
    error: false,
    message,
    result
  }) as const;

export function formatResponse<T>(data: T[], count: number) {
  return {
    data,
    count
  } as const;
}
