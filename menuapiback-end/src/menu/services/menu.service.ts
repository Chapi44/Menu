import { Injectable, NotFoundException } from '@nestjs/common'
import MenuRepository from '../repositories/menu.repository'
import CreateMenuDto from '../dtos/create-menu.dto'
import UpdateMenuDto from '../dtos/update-menu.dto'
import GetMenuDto from '../dtos/get-menu.dto'
import DeleteMenuDto from '../dtos/delete-menu.dto'

@Injectable()
export default class MenuService {
  constructor(private readonly menuRepository: MenuRepository) {}

  async createMenu(dto: CreateMenuDto) {
    let depth = 0
    let order = dto.order ?? 1
    const parentId = dto.parentId ?? null

    if (dto.parentId) {
      const parentMenu = await this.menuRepository.findMenuById(dto.parentId)
      if (!parentMenu) {
        throw new NotFoundException(
          `Parent menu with ID ${dto.parentId} not found`,
        )
      }

      depth = parentMenu.depth + 1
      const { _max: maxValue } = (await this.menuRepository.findMaxOrder(
        dto.parentId,
      )) || { _max: { order: 0 } }
      const maxOrder = maxValue?.order ?? 0

      order = dto.order ?? maxOrder + 1
    }

    return this.menuRepository.createMenu({ ...dto, parentId, depth, order })
  }

  async getMenuById(dto: GetMenuDto) {
    const menu = await this.menuRepository.getMenuById(dto)
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${dto.id} not found`)
    }

    return {
      ...menu,
      parentName: menu.parent ? menu.parent.name : null,
      children: menu.children.map((child) => ({
        ...child,
        parentName: child.parent ? child.parent.name : null,
        children: child.children.map((subChild) => ({
          ...subChild,
          parentName: subChild.parent ? subChild.parent.name : null,
        })),
      })),
    }
  }

  async getAllMenus() {
    const menus = await this.menuRepository.getAllMenus()

    return menus.map((menu) => ({
      ...menu,
      parentName: menu.parent ? menu.parent.name : null,
      children: menu.children.map((child) => ({
        ...child,
        parentName: child.parent ? child.parent.name : null,
        children: child.children.map((subChild) => ({
          ...subChild,
          parentName: subChild.parent ? subChild.parent.name : null,
        })),
      })),
    }))
  }

  async updateMenu(dto: UpdateMenuDto) {
    const existingMenu = await this.menuRepository.getMenuById({ id: dto.id })
    if (!existingMenu) {
      throw new NotFoundException(`Menu with ID ${dto.id} not found`)
    }
    return this.menuRepository.updateMenu(dto)
  }

  async softDeleteMenu(dto: DeleteMenuDto) {
    const existingMenu = await this.menuRepository.getMenuById({ id: dto.id })
    if (!existingMenu) {
      throw new NotFoundException(`Menu with ID ${dto.id} not found`)
    }
    return this.menuRepository.softDeleteMenu(dto)
  }
}
