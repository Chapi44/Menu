import {
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator'

export default class CreateMenuDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string

  @IsOptional()
  @IsUUID(4, { message: 'parentId must be a valid UUID' })
  @IsNotEmpty({ message: 'parentId cannot be empty if provided' })
  parentId?: string

  @IsOptional()
  @IsInt({ message: 'depth must be an integer' })
  @Min(0, { message: 'depth must be greater than or equal to 0' })
  depth: number

  @IsOptional()
  @IsInt({ message: 'order must be an integer' })
  @Min(0, { message: 'order must be greater than or equal to 0' })
  order: number
}
