import { ApiResponseProperty } from '@nestjs/swagger'

export default class ForbiddenErrorResponseDto {
  @ApiResponseProperty({ type: Number, example: 403 })
  statusCode: number

  @ApiResponseProperty({ type: String, example: 'Forbidden resource' })
  message: string
}
