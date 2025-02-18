import { ApiResponseProperty } from '@nestjs/swagger'

export default class Tag {
  @ApiResponseProperty({ example: 'environment' })
  key: string

  @ApiResponseProperty({ example: 'production' })
  value: string
}
