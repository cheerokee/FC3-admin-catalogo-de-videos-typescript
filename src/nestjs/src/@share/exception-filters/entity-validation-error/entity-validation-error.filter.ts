import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityValidationError } from "@fc/micro-videos/@seedwork/domain";
import { Response } from "express";
import { union } from 'lodash';

@Catch(EntityValidationError)
export class EntityValidationErrorFilter implements ExceptionFilter {
  catch(exception: EntityValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 422;

    response.status(status).json({
      statusCode: status,
      error: 'Unprocessable Entity',
      message: union(...Object.values(exception.error) as any)
    });
  }
}
