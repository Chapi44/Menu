import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Put,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'

import { ApiTags } from '@nestjs/swagger'
import {
  CreateMenuSwaggerDefinition,
  GetAllMenusSwaggerDefinition,
  GetMenuByIdSwaggerDefinition,
  UpdateMenuSwaggerDefinition,
  DeleteMenuSwaggerDefinition,
} from './decorators/menu.decorators'
import MenuService from './services/menu.service'
import CreateMenuDto from './dtos/create-menu.dto'
import GetMenuDto from './dtos/get-menu.dto'
import UpdateMenuDto from './dtos/update-menu.dto'
import DeleteMenuDto from './dtos/delete-menu.dto'

@Controller('menus')
@ApiTags('menus')
export default class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @CreateMenuSwaggerDefinition()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createMenu(@Body() dto: CreateMenuDto) {
    return this.menuService.createMenu(dto)
  }

  @Get('/menu/:id')
  @GetMenuByIdSwaggerDefinition()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getMenuById(@Param() dto: GetMenuDto) {
    return this.menuService.getMenuById(dto)
  }

  @Get()
  @GetAllMenusSwaggerDefinition()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllMenus() {
    return this.menuService.getAllMenus()
  }

  @Put(':id')
  @UpdateMenuSwaggerDefinition()
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateMenu(@Param() params: GetMenuDto, @Body() dto: UpdateMenuDto) {
    const updateDto = { ...dto, id: params.id }
    return this.menuService.updateMenu(updateDto)
  }

  @Delete(':id')
  @DeleteMenuSwaggerDefinition()
  @UsePipes(new ValidationPipe({ transform: true }))
  async softDeleteMenu(@Param() params: DeleteMenuDto) {
    return this.menuService.softDeleteMenu(params)
  }
}
