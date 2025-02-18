import { ApiProperty } from '@nestjs/swagger'

export default class WinstonIssueResponseDto {
  @ApiProperty()
  col: string

  @ApiProperty()
  errorType: string

  @ApiProperty()
  fileName: string

  @ApiProperty()
  id: string

  @ApiProperty()
  ip: string

  @ApiProperty()
  level: string

  @ApiProperty()
  message: string

  @ApiProperty()
  method: string

  @ApiProperty()
  path: string

  @ApiProperty()
  row: string

  @ApiProperty()
  stack: string

  @ApiProperty()
  status: number

  @ApiProperty()
  timestamp: string
}
