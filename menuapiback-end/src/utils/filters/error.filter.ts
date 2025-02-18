import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { Request } from 'express'
import { ExceptionResponse } from '../types'
import ErrorCustomException from '../exception/custom.exception'
import parseStackTrace from '../helpers/stack-trace-parser'
import WinstonLoggerService from '../../log-monitoring/winston/winston-logger.service'

@Catch(ErrorCustomException)
export default class ErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: WinstonLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<any>()
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const { message: messageResponse, property } =
      exception.getResponse() as ExceptionResponse

    let stackInfo: any
    if (exception instanceof Error) {
      stackInfo = parseStackTrace(exception.stack)
    }
    let status
    let message

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      message = exception.getResponse() || 'Internal server error'
    } else {
      status = 500
      message = 'Internal server error'
    }
    const loggerResponse = {
      id: uuidv4(),
      status,
      path: request.url,
      method: request.method,
      ip: request.ip,
      timestamp: new Date().toISOString(),
      stack: exception instanceof Error ? exception.stack : '',
    }
    this.loggerService.error(
      typeof message === 'object' ? message.message : message,
      { ...stackInfo, ...loggerResponse },
    )
    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: messageResponse,
      property,
    })
  }
}
