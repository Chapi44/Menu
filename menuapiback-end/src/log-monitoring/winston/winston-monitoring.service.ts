import { Injectable } from '@nestjs/common'
import * as path from 'path'
import readFileByRange from 'src/utils/helpers/read-files-range'
import ErrorCustomException from 'src/utils/exception/custom.exception'

interface IAnalytics {
  totalRequestCount: number
  failedRequestCount: number
  successfulRequestCount: number
  successRate: string
  failureRate: string
  errorTypes: { [key: string]: number }
}

@Injectable()
export default class WinstonMonitoringService {
  private logFilePath: string = 'logs'

  async getIssues(startDate: string, endDate: string) {
    try {
      const errorLogs = await readFileByRange(
        path.join(this.logFilePath, 'errors'),
        startDate,
        endDate,
        [],
      )
      return errorLogs
    } catch (error) {
      ErrorCustomException.handle(error, 'helper/readFile')
      throw error
    }
  }

  async getIssue(id: string) {
    const today = this.getTodayDate()
    const errorLogs = await readFileByRange(
      path.join(this.logFilePath, 'errors'),
      today,
      null,
      [],
    )
    const issue = errorLogs.find((singleIssue) => {
      return singleIssue.id === id
    })
    if (!issue) {
      throw new ErrorCustomException(
        `No issue found with id ${id}`,
        404,
        'winston',
      )
    }
    return issue
  }

  async getActivities(startDate: string, endDate: string) {
    try {
      const activityLog = await readFileByRange(
        path.join(this.logFilePath, 'activities'),
        startDate,
        endDate,
        [],
      )
      return activityLog
    } catch (error) {
      ErrorCustomException.handle(error, 'winston/activity')
      throw error
    }
  }

  async getActivity(id: string) {
    const today = this.getTodayDate()
    const activityLog = await readFileByRange(
      path.join(this.logFilePath, 'activities'),
      today,
      null,
      [],
    )
    const activity = activityLog.find(
      (singleActivity) => singleActivity.id === id,
    )
    if (!activity) {
      throw new ErrorCustomException(
        `No issue found with id ${id}`,
        404,
        'winston/activity',
      )
    }
    return activity
  }

  async getAnalytics(startDate: string, endDate: string): Promise<IAnalytics> {
    const errorLogs = await this.getIssues(startDate, endDate)
    const activityLogs = await this.getActivities(startDate, endDate)

    const errorTypes: { [key: string]: number } = {}

    errorLogs.forEach((issue) => {
      const status = issue.status || 'Not Request Related'
      if (!errorTypes[status]) {
        errorTypes[status] = 1
      } else {
        errorTypes[status] += 1
      }
    })

    const totalRequestCount = errorLogs.length + activityLogs.length
    const failedRequestCount = errorLogs.length
    const successfulRequestCount = activityLogs.length
    const successRate = `${((successfulRequestCount / totalRequestCount) * 100).toFixed(2)}%`
    const failureRate = `${((failedRequestCount / totalRequestCount) * 100).toFixed(2)}%`

    const analytics: IAnalytics = {
      totalRequestCount,
      failedRequestCount,
      successfulRequestCount,
      successRate,
      failureRate,
      errorTypes,
    }

    return analytics
  }

  private getTodayDate(): string {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
