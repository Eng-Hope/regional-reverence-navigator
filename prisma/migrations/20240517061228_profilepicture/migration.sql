-- CreateTable
CREATE TABLE `ProfilePicture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL DEFAULT '/profile.png',
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ProfilePicture_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProfilePicture` ADD CONSTRAINT `ProfilePicture_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
