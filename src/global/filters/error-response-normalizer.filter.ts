import { Response } from 'express';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from 'src/bootstrap';

@Catch()
export class ErrorResponseNormalizerFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorResponseNormalizerFilter.name);

  catch(rawException: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exception =
      rawException instanceof HttpException
        ? rawException
        : new InternalServerErrorException();

    const status = exception.getStatus();

    if (!(rawException instanceof HttpException))
      this.logger.error(
        rawException.message,
        rawException.stack,
        'ExceptionFilter',
      );

    response.status(status).send({ error: this.mapToErrorResponse(exception) });
  }

  private mapToErrorResponse(error: HttpException) {
    return {
      message: error.message,
      status: error.getStatus(),
      reasons: this.getReasons(error),
    };
  }

  private getReasons(error: HttpException): string[] | undefined {
    if (!(error instanceof BadRequestException)) return;

    const response = error.getResponse() as { message?: string[] };
    return response.message || [];
  }
}
