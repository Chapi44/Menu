import { ApiResponseProperty } from '@nestjs/swagger'

export default class WinstonActivityResponseDto {
  @ApiResponseProperty()
  id: string

  @ApiResponseProperty()
  level: string

  @ApiResponseProperty()
  message: string

  @ApiResponseProperty()
  method: string

  @ApiResponseProperty()
  res: Record<string, never>

  @ApiResponseProperty()
  status: number

  @ApiResponseProperty()
  timestamp: string

  @ApiResponseProperty()
  url: string
}
