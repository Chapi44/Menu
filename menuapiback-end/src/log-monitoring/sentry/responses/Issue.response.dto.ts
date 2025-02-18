import { ApiResponseProperty } from '@nestjs/swagger'
import { Stats } from 'fs'
import Metadata from './metadata.response.dto'
import Project from './project.response.dto'

export default class IssueResponseDto {
  @ApiResponseProperty({ example: '2010594' })
  id: string

  @ApiResponseProperty({ example: null })
  shareId: string | null

  @ApiResponseProperty({ example: 'VIRTUAL-GAMES-3' })
  shortId: string

  @ApiResponseProperty({
    example: 'Error: listen EADDRINUSE: address already in use :::3000',
  })
  title: string

  @ApiResponseProperty({ example: 'bootstrap(main.ts)' })
  culprit: string

  @ApiResponseProperty({ example: 'https://hiluf.sentry.io/issues/2010594/' })
  permalink: string

  @ApiResponseProperty({ example: null })
  logger: string | null

  @ApiResponseProperty({ example: 'error' })
  level: string

  @ApiResponseProperty({ example: 'unresolved' })
  status: string

  @ApiResponseProperty({ type: Object, example: {} })
  statusDetails: Record<string, any>

  @ApiResponseProperty({ example: 'new' })
  substatus: string

  @ApiResponseProperty({ example: false })
  isPublic: boolean

  @ApiResponseProperty({ example: 'node' })
  platform: string

  @ApiResponseProperty({ type: Project })
  project: Project

  @ApiResponseProperty({ example: 'error' })
  type: string

  @ApiResponseProperty({ type: Metadata })
  metadata: Metadata

  @ApiResponseProperty({ example: 0 })
  numComments: number

  @ApiResponseProperty({ example: null })
  assignedTo: string | null

  @ApiResponseProperty({ example: false })
  isBookmarked: boolean

  @ApiResponseProperty({ example: false })
  isSubscribed: boolean

  @ApiResponseProperty({ example: null })
  subscriptionDetails: string | null

  @ApiResponseProperty({ example: false })
  hasSeen: boolean

  @ApiResponseProperty({ type: [String], example: [] })
  annotations: string[]

  @ApiResponseProperty({ example: 'error' })
  issueType: string

  @ApiResponseProperty({ example: 'error' })
  issueCategory: string

  @ApiResponseProperty({ example: 'high' })
  priority: string

  @ApiResponseProperty({ example: null })
  priorityLockedAt: string | null

  @ApiResponseProperty({ example: true })
  isUnhandled: boolean

  @ApiResponseProperty({ example: '3' })
  count: string

  @ApiResponseProperty({ example: 0 })
  userCount: number

  @ApiResponseProperty({ example: '2024-07-01T11:06:49.834000Z' })
  firstSeen: string

  @ApiResponseProperty({ example: '2024-07-05T11:54:25.585000Z' })
  lastSeen: string

  @ApiResponseProperty({ type: Stats })
  stats: Stats
}
