import { ApiProperty } from '@nestjs/swagger'
import LinkDto from './link.response.dto'

export default class PaginationDto {
  @ApiProperty({ example: 1 })
  page: number

  @ApiProperty({ example: 10 })
  itemsPerPage: number

  @ApiProperty({ type: [LinkDto] })
  links: LinkDto[]

  @ApiProperty({ example: 5 })
  total: number

  @ApiProperty({ example: 1 })
  lastPage: number

  @ApiProperty({ example: null, nullable: true })
  prev: number | null

  @ApiProperty({ example: null, nullable: true })
  next: number | null
}
