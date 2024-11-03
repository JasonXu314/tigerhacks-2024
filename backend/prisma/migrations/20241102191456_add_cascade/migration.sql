-- DropForeignKey
ALTER TABLE `FoodItem` DROP FOREIGN KEY `FoodItem_userId_fkey`;

-- DropForeignKey
ALTER TABLE `FoodOffer` DROP FOREIGN KEY `FoodOffer_userId_fkey`;

-- AddForeignKey
ALTER TABLE `FoodItem` ADD CONSTRAINT `FoodItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodOffer` ADD CONSTRAINT `FoodOffer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
