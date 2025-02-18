import { Module } from '@nestjs/common'
import SentryModule from './sentry/sentry.module'
import WinstonModule from './winston/winston.module'

@Module({
  imports: [SentryModule, WinstonModule],
  exports: [WinstonModule],
})
export default class LogMonitoringModule {}
