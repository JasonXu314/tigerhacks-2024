-- CreateTable
CREATE TABLE `FoodItem` (
    `userId` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `boughtDate` DATETIME(3) NOT NULL,
    `expDate` DATETIME(3) NOT NULL,
    `publicized` BOOLEAN NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    INDEX `FoodItem_id_idx`(`id`),
    PRIMARY KEY (`userId`, `id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FoodItem` ADD CONSTRAINT `FoodItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
