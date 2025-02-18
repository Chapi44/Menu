import { HttpException, HttpStatus } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import ErrorMessages from '../maps/error.maps'

export default class ErrorCustomException extends HttpException {
  constructor(message: string, statusCode: HttpStatus, property: string = '') {
    super(
      {
        message,
        property,
      },
      statusCode,
    )
  }

  static handle(error: Error, property?: string) {
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2025':
        case 'P2016':
          throw new ErrorCustomException(
            ErrorMessages.notFound,
            HttpStatus.NOT_FOUND,
            property,
          )
        case 'P2021':
          throw new ErrorCustomException(
            ErrorMessages.databaseConnectionError,
            HttpStatus.INTERNAL_SERVER_ERROR,
            property,
          )
        case 'P2002':
          throw new ErrorCustomException(
            ErrorMessages.exists,
            HttpStatus.CONFLICT,
            property,
          )
        default:
          throw new ErrorCustomException(error.message, 400, property)
      }
    } else if (error.message.startsWith('Firebase ID token has expired')) {
      throw new ErrorCustomException(
        'OTP has expired. Please try again.',
        400,
        property,
      )
    } else if (
      error.message.startsWith('Firebase ID token has invalid signature.')
    ) {
      throw new ErrorCustomException(
        'Invalid OTP. Please try again.',
        400,
        property,
      )
    } else if (error instanceof ErrorCustomException) {
      throw error
    } else {
      throw new ErrorCustomException('Something went wrong!', 500, property)
    }
  }
}
