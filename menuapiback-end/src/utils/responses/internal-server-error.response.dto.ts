import { ApiResponseProperty } from '@nestjs/swagger'

export default class InternalServerErrorResponseDto {
  @ApiResponseProperty({ type: Number, example: 500 })
  statusCode: number

  @ApiResponseProperty({ type: String, example: 'Something went wrong.' })
  message: string
}
