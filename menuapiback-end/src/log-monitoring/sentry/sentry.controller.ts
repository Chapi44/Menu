import { Controller, Get } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import SentryLoggerService from './sentry-logger.service'
import EventResponseDto from './responses/event.response.dto'
import IssueResponseDto from './responses/Issue.response.dto'

@Controller('sentry')
@ApiTags('sentry')
export default class SentryController {
  constructor(private readonly sentryLoggerService: SentryLoggerService) {}

  @Get('/issues')
  @ApiResponse({
    status: 200,
    description: 'Get error details',
    type: IssueResponseDto,
  })
  getIssues(): Promise<IssueResponseDto[]> {
    return this.sentryLoggerService.getIssues()
  }

  @Get('/events')
  @ApiResponse({
    status: 200,
    description: 'Get error details',
    type: EventResponseDto,
  })
  getEvents(): Promise<EventResponseDto> {
    return this.sentryLoggerService.getEvents()
  }
}
