import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export default class MenuChildResponse {
  @ApiProperty({
    description: 'The unique identifier for the child menu item',
    type: 'string',
    format: 'uuid',
    example: 'c3d8a4e2-91f1-4b3a-8ea6-92b5e84217df',
  })
  id: string

  @ApiProperty({
    description: 'The name of the child menu item',
    type: 'string',
    example: 'User Management',
  })
  name: string

  @ApiPropertyOptional({
    description: 'The parent menu ID',
    type: 'string',
    format: 'uuid',
    nullable: true,
    example: 'fbeec707-3d6f-41bb-9dec-63d5a24c957d',
  })
  parentId?: string | null

  @ApiProperty({
    description: 'The depth level of the menu in the hierarchy',
    type: 'number',
    example: 2,
  })
  depth: number

  @ApiProperty({
    description: 'The order in which the child menu appears',
    type: 'number',
    example: 2,
  })
  order: number

  @ApiProperty({
    description: 'The timestamp when the child menu item was created',
    type: 'string',
    format: 'date-time',
    example: '2024-12-11T14:07:31.502Z',
  })
  createdAt: Date

  @ApiProperty({
    description: 'The timestamp when the child menu item was last updated',
    type: 'string',
    format: 'date-time',
    example: '2024-12-11T14:07:31.502Z',
  })
  updatedAt: Date

  @ApiPropertyOptional({
    description:
      'The timestamp when the child menu item was deleted, if applicable; otherwise null',
    type: 'string',
    format: 'date-time',
    nullable: true,
    example: null,
  })
  deletedAt?: Date | null
}
