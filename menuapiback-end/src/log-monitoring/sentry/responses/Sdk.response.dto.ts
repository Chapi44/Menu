import { ApiResponseProperty } from '@nestjs/swagger'

export default class Sdk {
  @ApiResponseProperty({ example: 'sentry.javascript.node' })
  name: string

  @ApiResponseProperty({ example: 'sentry.javascript.node' })
  // eslint-disable-next-line
  name_normalized: string
}
