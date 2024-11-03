-- DropForeignKey
ALTER TABLE `FoodOffer` DROP FOREIGN KEY `FoodOffer_userId_foodId_fkey`;

-- AddForeignKey
ALTER TABLE `FoodOffer` ADD CONSTRAINT `FoodOffer_userId_foodId_fkey` FOREIGN KEY (`userId`, `foodId`) REFERENCES `FoodItem`(`userId`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;
