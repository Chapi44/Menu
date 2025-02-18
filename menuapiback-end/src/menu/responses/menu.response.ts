import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export default class MenuResponse {
  @ApiProperty({
    description: 'The unique identifier for the menu item',
    type: 'string',
    format: 'uuid',
    example: 'fbeec707-3d6f-41bb-9dec-63d5a24c957d',
  })
  id: string

  @ApiProperty({
    description: 'The name of the menu item',
    type: 'string',
    example: 'System Management',
  })
  name: string

  @ApiPropertyOptional({
    description: 'The parent menu ID if this menu is a child; otherwise null',
    type: 'string',
    format: 'uuid',
    nullable: true,
    example: null,
  })
  parentId?: string | null

  @ApiProperty({
    description: 'The depth level of the menu in the hierarchy',
    type: 'number',
    example: 1,
  })
  depth: number

  @ApiProperty({
    description: 'The order in which the menu appears under its parent',
    type: 'number',
    example: 3,
  })
  order: number

  @ApiProperty({
    description: 'The timestamp when the menu item was created',
    type: 'string',
    format: 'date-time',
    example: '2024-12-11T14:07:31.502Z',
  })
  createdAt: Date

  @ApiProperty({
    description: 'The timestamp when the menu item was last updated',
    type: 'string',
    format: 'date-time',
    example: '2024-12-11T14:07:31.502Z',
  })
  updatedAt: Date

  @ApiPropertyOptional({
    description:
      'The timestamp when the menu item was deleted, if applicable; otherwise null',
    type: 'string',
    format: 'date-time',
    nullable: true,
    example: null,
  })
  deletedAt?: Date | null
}
