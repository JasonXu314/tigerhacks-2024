/*
  Warnings:

  - You are about to drop the column `publicized` on the `FoodItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `FoodItem` DROP COLUMN `publicized`;

-- CreateTable
CREATE TABLE `FoodOffer` (
    `userId` VARCHAR(191) NOT NULL,
    `foodId` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `foodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FoodOffer` ADD CONSTRAINT `FoodOffer_userId_foodId_fkey` FOREIGN KEY (`userId`, `foodId`) REFERENCES `FoodItem`(`userId`, `id`) ON DELETE RESTRICT ON UPDATE CASCADE;
