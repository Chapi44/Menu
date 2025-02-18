import { ApiResponseProperty } from '@nestjs/swagger'

export default class WinstonResponseAnalyticsDto {
  @ApiResponseProperty()
  totalRequestCount: number

  @ApiResponseProperty()
  failedRequestCount: number

  @ApiResponseProperty()
  successfulRequestCount: number

  @ApiResponseProperty()
  successRate: string

  @ApiResponseProperty()
  failureRate: string

  @ApiResponseProperty()
  errorTypes: { [key: string]: number }
}
