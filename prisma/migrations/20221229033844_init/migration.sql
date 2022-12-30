-- CreateTable
CREATE TABLE `ayah_connection` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `ayat` INTEGER NOT NULL,
    `surah` INTEGER NOT NULL,
    `random_string_connection` VARCHAR(25) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
