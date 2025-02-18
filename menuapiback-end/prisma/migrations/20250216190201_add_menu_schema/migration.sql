/*
  Warnings:

  - You are about to drop the `_PermissionToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin_password_reset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PermissionToRole" DROP CONSTRAINT "_PermissionToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToRole" DROP CONSTRAINT "_PermissionToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "admin_password_reset" DROP CONSTRAINT "admin_password_reset_adminId_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_deletedBy_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_roleId_fkey";

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_updatedBy_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_createdBy_fkey";

-- DropTable
DROP TABLE "_PermissionToRole";

-- DropTable
DROP TABLE "admin_password_reset";

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "contents";

-- DropTable
DROP TABLE "permissions";

-- DropTable
DROP TABLE "roles";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "LanguagePreference";

-- DropEnum
DROP TYPE "ModuleName";

-- DropEnum
DROP TYPE "PermissionType";

-- DropEnum
DROP TYPE "ProjectType";

-- DropEnum
DROP TYPE "RoleType";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "menus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,
    "depth" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "menus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
