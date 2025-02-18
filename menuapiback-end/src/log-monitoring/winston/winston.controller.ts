import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import WinstonActivityResponseDto from './responses/activity.response.dto'
import WinstonResponseAnalyticsDto from './responses/analytics.response.dto'
import WinstonIssueResponseDto from './responses/issue.response.dto'
import WinstonMonitoringService from './winston-monitoring.service'

@Controller('winston')
@ApiBearerAuth()
@ApiTags('winston')
export default class WinstonController {
  constructor(private readonly monitoringService: WinstonMonitoringService) {}

  @Get('/issues')
  @ApiResponse({
    status: 200,
    description: 'Get error details',
    type: WinstonIssueResponseDto,
  })
  @ApiQuery({ name: 'endDate', required: false })
  getIssues(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate?: string,
  ): Promise<WinstonIssueResponseDto[]> {
    return this.monitoringService.getIssues(startDate, endDate)
  }

  @Get('/issues/:id')
  @ApiResponse({
    status: 200,
    description: 'Get error details',
    type: WinstonIssueResponseDto,
  })
  getIssue(@Param('id') id: string): Promise<WinstonIssueResponseDto> {
    return this.monitoringService.getIssue(id)
  }

  @Get('/activities')
  @ApiResponse({
    status: 200,
    description: 'Get error details',
    type: WinstonActivityResponseDto,
  })
  @ApiQuery({ name: 'endDate', required: false })
  getActivities(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate?: string,
  ): Promise<WinstonActivityResponseDto[]> {
    return this.monitoringService.getActivities(startDate, endDate)
  }

  @Get('/activities/:id')
  @ApiResponse({
    status: 200,
    description: 'Get error details',
    type: WinstonActivityResponseDto,
  })
  getActivity(@Param('id') id: string): Promise<WinstonActivityResponseDto> {
    return this.monitoringService.getActivity(id)
  }

  @Get('/analytics')
  @ApiResponse({
    status: 200,
    description: 'Get error details',
    type: WinstonResponseAnalyticsDto,
  })
  @ApiQuery({ name: 'endDate', required: false })
  getAnalytics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate?: string,
  ): Promise<WinstonResponseAnalyticsDto> {
    return this.monitoringService.getAnalytics(startDate, endDate)
  }
}
