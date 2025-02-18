import { Module } from '@nestjs/common'
import SentryLoggerService from './sentry-logger.service'
import SentryController from './sentry.controller'

@Module({
  imports: [],
  providers: [SentryLoggerService],
  controllers: [SentryController],
})
export default class SentryModule {}
