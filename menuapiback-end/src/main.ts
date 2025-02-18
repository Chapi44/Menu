import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BaseExceptionFilter, HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as Sentry from '@sentry/node'
import AppModule from './app.module'
import './instrument'
import WinstonLoggerService from './log-monitoring/winston/winston-logger.service'
import ErrorExceptionFilter from './utils/filters/error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const logger = new Logger()

  app.enableCors({
    origin: ['https://menu-ruby.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .setTitle('API Gateway Documentation')
    .setDescription('API documentation for Menumangement')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  const { httpAdapter } = app.get(HttpAdapterHost)

  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter))

  const winstonLoggerService = app.get(WinstonLoggerService)
  app.useGlobalFilters(new ErrorExceptionFilter(winstonLoggerService))

  await app.listen(configService.get<number>('APP_PORT') || 3000, async () =>
    logger.verbose(`Application running at: ${await app.getUrl()}`),
  )
}
bootstrap()
