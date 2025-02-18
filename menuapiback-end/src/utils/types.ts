export type ExceptionResponse = {
  message: string
  property: string
}

type Module = {
  id: number
  name: string
}

export type Permission = {
  id: number
  description?: string
  type: string
  Module: Module
}

export type Role = {
  id: number
  name: string
  description: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  Permissions: Permission[]
}

export type User = {
  id: string
  username: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}

export type AdminFilter = {
  username?: string
  email?: string
  id?: number
}
