import { ApiProperty } from '@nestjs/swagger'
import PaginationDto from './pagination.response.dto'

export default class PayloadDto {
  @ApiProperty({ type: PaginationDto })
  pagination: PaginationDto
}
