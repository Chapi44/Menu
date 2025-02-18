import { PartialType } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator'
import CreateMenuDto from './create-menu.dto'

export default class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsOptional()
  @IsUUID(4, { message: 'id must be a valid UUID' })
  id?: string

  @IsOptional()
  @IsUUID(4, { message: 'childId must be a valid UUID' })
  childId?: string

  @IsOptional()
  @IsUUID(4, { message: 'parentId must be a valid UUID' })
  @IsNotEmpty({ message: 'parentId cannot be empty if provided' })
  parentId?: string
}
