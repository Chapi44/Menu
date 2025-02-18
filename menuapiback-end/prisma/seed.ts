import { PrismaClient } from '@prisma/client'
import { Logger } from '@nestjs/common'

const prisma = new PrismaClient()
const logger = new Logger('Seed')

async function main() {
  logger.log('Seeding menu data...')

  // Root Menu
  const systemManagement = await prisma.menu.create({
    data: {
      name: 'System Management',
      parentId: null,
      depth: 0,
      order: 1,
    },
  })

  // First-level menus under System Management
  const systems = await prisma.menu.create({
    data: {
      name: 'Systems',
      parentId: systemManagement.id,
      depth: 1,
      order: 1,
    },
  })

  const usersAndGroups = await prisma.menu.create({
    data: {
      name: 'Users & Groups',
      parentId: systemManagement.id,
      depth: 1,
      order: 2,
    },
  })

  // Second-level menus under Systems
  const systemCode = await prisma.menu.create({
    data: {
      name: 'System Code',
      parentId: systems.id,
      depth: 2,
      order: 1,
    },
  })

  const menus = await prisma.menu.create({
    data: {
      name: 'Menus',
      parentId: systems.id,
      depth: 2,
      order: 3,
    },
  })

  const apiList = await prisma.menu.create({
    data: {
      name: 'API List',
      parentId: systems.id,
      depth: 2,
      order: 4,
    },
  })

  // Third-level menus under System Code
  await prisma.menu.createMany({
    data: [
      {
        name: 'Code Registration',
        parentId: systemCode.id,
        depth: 3,
        order: 1,
      },
      {
        name: 'Code Registration - 2',
        parentId: systemCode.id,
        depth: 3,
        order: 2,
      },
    ],
  })

  // Third-level menus under Menus
  await prisma.menu.create({
    data: {
      name: 'Menu Registration',
      parentId: menus.id,
      depth: 3,
      order: 1,
    },
  })

  // Third-level menus under API List
  await prisma.menu.createMany({
    data: [
      {
        name: 'API Registration',
        parentId: apiList.id,
        depth: 3,
        order: 1,
      },
      {
        name: 'API Edit',
        parentId: apiList.id,
        depth: 3,
        order: 2,
      },
    ],
  })

  // Second-level menus under Users & Groups
  const users = await prisma.menu.create({
    data: {
      name: 'Users',
      parentId: usersAndGroups.id,
      depth: 2,
      order: 1,
    },
  })

  const groups = await prisma.menu.create({
    data: {
      name: 'Groups',
      parentId: usersAndGroups.id,
      depth: 2,
      order: 2,
    },
  })

  const userApproval = await prisma.menu.create({
    data: {
      name: '사용자 승인', // Korean for "User Approval"
      parentId: usersAndGroups.id,
      depth: 2,
      order: 3,
    },
  })

  // Third-level menus under Users
  await prisma.menu.create({
    data: {
      name: 'User Account Registration',
      parentId: users.id,
      depth: 3,
      order: 1,
    },
  })

  // Third-level menus under Groups
  await prisma.menu.create({
    data: {
      name: 'User Group Registration',
      parentId: groups.id,
      depth: 3,
      order: 1,
    },
  })

  // Fourth-level menus under User Approval
  await prisma.menu.create({
    data: {
      name: '사용자 승인 상세', // Korean for "User Approval Details"
      parentId: userApproval.id,
      depth: 3,
      order: 1,
    },
  })

  // ===========================
  // ✅ New Root Menu: Competition
  // ===========================
  const competition = await prisma.menu.create({
    data: {
      name: 'Competition',
      parentId: null,
      depth: 0,
      order: 3, // Placing after System Management and Users & Groups
    },
  })

  // First-level menus under Competition
  const competitionList = await prisma.menu.create({
    data: {
      name: 'Competition List',
      parentId: competition.id,
      depth: 1,
      order: 1,
    },
  })

  // const competitionSettings = await prisma.menu.create({
  //   data: {
  //     name: 'Competition Settings',
  //     parentId: competition.id,
  //     depth: 1,
  //     order: 2,
  //   },
  // })

  // Second-level menus under Competition List
  const ongoingCompetitions = await prisma.menu.create({
    data: {
      name: 'Ongoing Competitions',
      parentId: competitionList.id,
      depth: 2,
      order: 1,
    },
  })

  const pastCompetitions = await prisma.menu.create({
    data: {
      name: 'Past Competitions',
      parentId: competitionList.id,
      depth: 2,
      order: 2,
    },
  })

  // Third-level menus under Ongoing Competitions
  await prisma.menu.create({
    data: {
      name: 'Live Competitions',
      parentId: ongoingCompetitions.id,
      depth: 3,
      order: 1,
    },
  })

  // Third-level menus under Past Competitions
  await prisma.menu.create({
    data: {
      name: 'Archived Competitions',
      parentId: pastCompetitions.id,
      depth: 3,
      order: 1,
    },
  })

  logger.log('Menu data has been seeded successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    logger.error('Error while seeding data:', e)
    process.exit(1)
  })
