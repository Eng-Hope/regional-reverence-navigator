/*
  Warnings:

  - You are about to drop the `ProfilePicture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ProfilePicture` DROP FOREIGN KEY `ProfilePicture_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `profilePicture` VARCHAR(191) NOT NULL DEFAULT '/profile.png';

-- DropTable
DROP TABLE `ProfilePicture`;
