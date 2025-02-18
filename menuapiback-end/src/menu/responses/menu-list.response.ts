import { ApiProperty } from '@nestjs/swagger'
import MenuResponse from './menu.response'

export default class MenuListResponse {
  @ApiProperty({
    description: 'List of menu items',
    type: [MenuResponse],
  })
  menus: MenuResponse[]
}
