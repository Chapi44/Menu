import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { HttpModule } from '@nestjs/axios'
import { ScheduleModule } from '@nestjs/schedule'
import MenuModule from './menu/menu.module'
import AppService from './app.service'
import LogMonitoringModule from './log-monitoring/log-monitoring.module'

import PrismaModule from './prisma/prisma.module'
import ActivityInterceptor from './utils/interceptors/activity.interceptor'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    LogMonitoringModule,
    MenuModule,
  ],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ActivityInterceptor },
  ],
})
export default class AppModule {}
