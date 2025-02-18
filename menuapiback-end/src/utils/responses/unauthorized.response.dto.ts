import { ApiResponseProperty } from '@nestjs/swagger'

export default class UnauthorizedErrorResponseDto {
  @ApiResponseProperty({ type: Number, example: 401 })
  statusCode: number

  @ApiResponseProperty({ type: String, example: 'Unauthorized' })
  message: string
}
