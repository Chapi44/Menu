import { Module } from '@nestjs/common'
import WinstonLoggerService from './winston-logger.service'
import WinstonController from './winston.controller'
import WinstonMonitoringService from './winston-monitoring.service'

@Module({
  controllers: [WinstonController],
  providers: [WinstonLoggerService, WinstonMonitoringService],
  exports: [WinstonLoggerService],
})
export default class WinstonModule {}
