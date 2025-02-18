import { IsUUID, IsNotEmpty, IsOptional } from 'class-validator'

export default class DeleteMenuDto {
  @IsUUID(4, { message: 'id must be a valid UUID' })
  @IsNotEmpty({ message: 'id cannot be empty' })
  id: string

  @IsOptional()
  @IsUUID(4, { message: 'parentId must be a valid UUID if provided' })
  parentId?: string

  @IsOptional()
  @IsUUID(4, { message: 'childId must be a valid UUID if provided' })
  childId?: string
}
