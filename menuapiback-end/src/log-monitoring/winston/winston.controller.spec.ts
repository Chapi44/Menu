import { Test, TestingModule } from '@nestjs/testing'
import WinstonController from './winston.controller'

describe('WinstonController', () => {
  let controller: WinstonController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WinstonController],
    }).compile()

    controller = module.get<WinstonController>(WinstonController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
