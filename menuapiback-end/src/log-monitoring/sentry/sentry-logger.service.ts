import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import ErrorCustomException from 'src/utils/exception/custom.exception'

@Injectable()
export default class SentryLoggerService {
  constructor(private readonly configService: ConfigService) {}

  async getIssues() {
    try {
      const response = await axios.get(
        `${this.configService.get<string>('SENTRY_API_URL')}issues/`,
        {
          headers: {
            // eslint-disable-next-line
            Authorization: `Bearer ${this.configService.get<string>('SENTRY_TOKEN')}`,
          },
        },
      )
      return response.data
    } catch (error) {
      ErrorCustomException.handle(error, 'sentry/issues')
      throw error
    }
  }

  async getEvents() {
    try {
      const response = await axios.get(
        `${this.configService.get<string>('SENTRY_API_URL')}events/`,
        {
          headers: {
            // eslint-disable-next-line
            Authorization: `Bearer ${this.configService.get<string>('SENTRY_TOKEN')}`,
          },
        },
      )
      return response.data
    } catch (error) {
      ErrorCustomException.handle(error, 'sentry/events')
      throw error
    }
  }
}
