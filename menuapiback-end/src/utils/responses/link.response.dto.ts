import { ApiProperty } from '@nestjs/swagger'

export default class LinkDto {
  @ApiProperty({ example: '1' })
  label: string

  @ApiProperty({ example: false })
  active: boolean

  @ApiProperty({ example: null, nullable: true })
  url: string | null

  @ApiProperty({ example: 1 })
  page: number
}
