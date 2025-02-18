import { ApiResponseProperty } from '@nestjs/swagger'
import Tag from './tag.response.dto'

export default class EventResponseDto {
  @ApiResponseProperty({ example: 'f60300415aa24c7c93eaf438256183b5' })
  id: string

  @ApiResponseProperty({ example: 'error' })
  // eslint-disable-next-line
  'event.type': string

  @ApiResponseProperty({ example: '2010594' })
  groupID: string

  @ApiResponseProperty({ example: 'f60300415aa24c7c93eaf438256183b5' })
  eventID: string

  @ApiResponseProperty({ example: '4507513989038160' })
  projectID: string

  @ApiResponseProperty({ example: '' })
  message: string

  @ApiResponseProperty({
    example: 'Error: listen EADDRINUSE: address already in use :::3000',
  })
  title: string

  @ApiResponseProperty({ example: '/main.ts' })
  location: string

  @ApiResponseProperty({ example: 'bootstrap(main.ts)' })
  culprit: string

  @ApiResponseProperty({ example: null })
  user: any

  @ApiResponseProperty({ type: [Tag] })
  tags: Tag[]

  @ApiResponseProperty({ example: 'node' })
  platform: string

  @ApiResponseProperty({ example: '2024-07-05T11:54:25Z' })
  dateCreated: string

  @ApiResponseProperty({ example: null })
  crashFile: any
}
