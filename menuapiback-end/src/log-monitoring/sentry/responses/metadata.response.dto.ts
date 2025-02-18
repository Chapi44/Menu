import { ApiResponseProperty } from '@nestjs/swagger'
import Sdk from './Sdk.response.dto'

export default class Metadata {
  @ApiResponseProperty({
    example: 'listen EADDRINUSE: address already in use :::3000',
  })
  value: string

  @ApiResponseProperty({ example: 'Error' })
  type: string

  @ApiResponseProperty({ example: '/main.ts' })
  filename: string

  @ApiResponseProperty({ example: 'bootstrap' })
  function: string

  @ApiResponseProperty({ example: false })
  // eslint-disable-next-line
  display_title_with_tree_label: boolean

  @ApiResponseProperty({ example: 'mixed' })
  // eslint-disable-next-line
  in_app_frame_mix: string

  @ApiResponseProperty({ type: () => Sdk })
  sdk: Sdk

  @ApiResponseProperty({ example: 75 })
  // eslint-disable-next-line
  initial_priority: number

  @ApiResponseProperty({ example: null })
  title: string | null
}
