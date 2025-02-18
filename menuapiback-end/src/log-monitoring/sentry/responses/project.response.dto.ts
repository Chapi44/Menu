import { ApiResponseProperty } from '@nestjs/swagger'

export default class Project {
  @ApiResponseProperty({ example: '4507513989038160' })
  id: string

  @ApiResponseProperty({ example: 'virtual-games' })
  name: string

  @ApiResponseProperty({ example: 'virtual-games' })
  slug: string

  @ApiResponseProperty({ example: 'node-nestjs' })
  platform: string
}
