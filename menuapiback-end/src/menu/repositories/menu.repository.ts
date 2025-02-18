import { Injectable } from '@nestjs/common'
import PrismaService from 'src/prisma/prisma.service'
import CreateMenuDto from '../dtos/create-menu.dto'
import UpdateMenuDto from '../dtos/update-menu.dto'
import GetMenuDto from '../dtos/get-menu.dto'
import DeleteMenuDto from '../dtos/delete-menu.dto'

@Injectable()
export default class MenuRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMenu(dto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: {
        name: dto.name,
        parentId: dto.parentId ?? null,
        depth: dto.depth,
        order: dto.order,
      },
    })
  }

  async findMenuById(id: string) {
    return this.prisma.menu.findUnique({
      where: { id },
    })
  }

  async findMaxOrder(parentId: string | null) {
    return this.prisma.menu.aggregate({
      where: { parentId },
      _max: { order: true },
    })
  }

  async getMenuById(dto: GetMenuDto) {
    return this.prisma.menu.findUnique({
      where: { id: dto.id, deletedAt: null },
      include: {
        parent: {
          select: { name: true },
        },
        children: {
          where: { deletedAt: null },
          orderBy: { order: 'asc' },
          include: {
            parent: { select: { name: true } },
            children: {
              where: { deletedAt: null },
              orderBy: { order: 'asc' },
              include: {
                parent: { select: { name: true } },
                children: {
                  where: { deletedAt: null },
                  orderBy: { order: 'asc' },
                  include: {
                    parent: { select: { name: true } },
                    children: {
                      where: { deletedAt: null },
                      orderBy: { order: 'asc' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
  }

  async getAllMenus() {
    return this.prisma.menu.findMany({
      where: { parentId: null, deletedAt: null },
      include: {
        parent: {
          select: { name: true },
        },
        children: {
          where: { deletedAt: null },
          orderBy: { order: 'asc' },
          include: {
            parent: { select: { name: true } },
            children: {
              where: { deletedAt: null },
              orderBy: { order: 'asc' },
              include: {
                parent: { select: { name: true } },
                children: {
                  where: { deletedAt: null },
                  orderBy: { order: 'asc' },
                  include: {
                    parent: { select: { name: true } },
                    children: {
                      where: { deletedAt: null },
                      orderBy: { order: 'asc' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { order: 'asc' },
    })
  }

  async updateMenu(dto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: { id: dto.id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.parentId && { parentId: dto.parentId }),
        ...(dto.depth !== undefined && { depth: dto.depth }),
        ...(dto.order !== undefined && { order: dto.order }),
        updatedAt: new Date(),
      },
    })
  }

  async softDeleteMenu(dto: DeleteMenuDto) {
    return this.prisma.menu.update({
      where: { id: dto.id },
      data: { deletedAt: new Date() },
    })
  }
}
