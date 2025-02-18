import { IsUUID, IsOptional } from 'class-validator'

export default class GetMenuDto {
  @IsOptional()
  @IsUUID(4, { message: 'id must be a valid UUID' })
  id?: string

  @IsOptional()
  @IsUUID(4, { message: 'parentId must be a valid UUID' })
  parentId?: string
}
