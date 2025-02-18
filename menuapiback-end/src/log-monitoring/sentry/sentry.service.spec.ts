import { Test, TestingModule } from '@nestjs/testing'
import SentryLoggerService from './sentry-logger.service'

describe('SentryLoggerService', () => {
  let service: SentryLoggerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SentryLoggerService],
    }).compile()

    service = module.get<SentryLoggerService>(SentryLoggerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
