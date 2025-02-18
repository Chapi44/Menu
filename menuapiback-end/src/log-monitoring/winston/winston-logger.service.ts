import { Injectable, LoggerService } from '@nestjs/common'
import * as winston from 'winston'
import * as DailyRotateFile from 'winston-daily-rotate-file'

@Injectable()
export default class WinstonLoggerService implements LoggerService {
  private errorLogger: winston.Logger

  private activityLogger: winston.Logger

  constructor() {
    this.errorLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
      ),
      transports: [
        new DailyRotateFile({
          filename: 'logs/errors/%DATE%-errors.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxSize: '20mb',
          maxFiles: '14d',
        }),
      ],
    })

    this.activityLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
      ),
      transports: [
        new DailyRotateFile({
          filename: 'logs/activities/%DATE%-activity.log',
          datePattern: 'YYYY-MM-DD',
          level: 'info',
          maxSize: '20mb',
          maxFiles: '14d',
        }),
      ],
    })

    if (process.env.NODE_ENV !== 'production') {
      const consoleTransport = new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          winston.format.simple(),
          winston.format.colorize(),
        ),
      })
      this.errorLogger.add(consoleTransport)
      this.activityLogger.add(consoleTransport)
    }
  }

  log(message: string, metadata?: Record<string, unknown>) {
    this.activityLogger.info(message, metadata)
  }

  error(message: string, metadata?: Record<string, unknown>) {
    this.errorLogger.error(message, { ...metadata })
  }

  warn(message: string, metadata?: Record<string, unknown>) {
    this.activityLogger.warn(message, metadata)
  }

  debug(message: string, metadata?: Record<string, unknown>) {
    this.activityLogger.debug(message, metadata)
  }

  verbose(message: string, metadata?: Record<string, unknown>) {
    this.activityLogger.verbose(message, metadata)
  }
}
