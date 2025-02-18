import { Module } from '@nestjs/common'
import PrismaService from 'src/prisma/prisma.service'
import MenuController from './menu.controller'
import MenuService from './services/menu.service'
import MenuRepository from './repositories/menu.repository'

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuRepository, PrismaService],
  exports: [MenuService],
})
export default class MenuModule {}
