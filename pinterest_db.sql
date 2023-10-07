-- Create Database
DROP DATABASE IF EXISTS `pinterest_db`;
CREATE DATABASE IF NOT EXISTS `pinterest_db`;
USE pinterest_db;

-- Table user
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    CHECK (email REGEXP '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
    `password` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `age` INT NOT NULL CHECK (age >= 0),
    `avatar` VARCHAR(255) NOT NULL,
    `path` TEXT NOT NULL,
    PRIMARY KEY (`user_id`)
);

-- Table image
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
    `image_id` INT NOT NULL AUTO_INCREMENT,
    `image_name` VARCHAR(255) NOT NULL,
    `path` TEXT NOT NULL,
    `desc` VARCHAR(255) DEFAULT 'No Description',
    PRIMARY KEY (`image_id`)
);

-- Table comment
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
    `comment_id` INT NOT NULL AUTO_INCREMENT,
    `date_comment` DATETIME DEFAULT NOW(),
    `content` TEXT NOT NULL,
    PRIMARY KEY (`comment_id`)
);

-- Table save_image
DROP TABLE IF EXISTS `save_image`;
CREATE TABLE `save_image` (
    `date_save` DATETIME DEFAULT NOW(),
    `image_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`image_id` , `user_id`),
    CONSTRAINT `fk_save_image` FOREIGN KEY (`image_id`)
        REFERENCES `image` (`image_id`)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `fk_save_user` FOREIGN KEY (`user_id`)
        REFERENCES `user` (`user_id`)
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relationship 1 - n (user - image)
ALTER TABLE `image`
ADD COLUMN `user_id` INT NOT NULL,
ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE ON DELETE CASCADE;

-- Relationship n - n (user - image)
ALTER TABLE `comment`
ADD COLUMN `image_id` INT NOT NULL,
ADD COLUMN `user_id` INT NOT NULL,
ADD CONSTRAINT `fk_comment_image` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`) ON UPDATE CASCADE ON DELETE CASCADE,
ADD CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE ON DELETE CASCADE;

-- Fake Data
-- Dữ liệu giả cho bảng user
INSERT INTO `user` (`email`, `password`, `username`, `age`, `avatar`, `path`)
VALUES
    ('user1@gmail.com', '$2b$10$Vg5LGsYowKWVqjkHaLo.LOlTfNj.gMS.Dk4gBBoagwCA75wb6cgHi', 'user1', 42, 'defaultAvatar.png', 'No path'),
    ('user2@gmail.com', '$2b$10$Vg5LGsYowKWVqjkHaLo.LOlTfNj.gMS.Dk4gBBoagwCA75wb6cgHi', 'user2', 30, 'defaultAvatar.png', 'No path'),
    ('user3@gmail.com', '$2b$10$Vg5LGsYowKWVqjkHaLo.LOlTfNj.gMS.Dk4gBBoagwCA75wb6cgHi', 'user3', 22, 'defaultAvatar.png', 'No path');
    -- Thêm các bản ghi khác ở đây...

-- Dữ liệu giả cho bảng image
INSERT INTO `image` (`image_name`, `path`, `desc`, `user_id`)
VALUES
    ('example.png', 'No path', 'Description 1', 1),
    ('example.png', 'No path', 'Description 2', 2),
    ('example.png', 'No path', 'Description 3', 3);
    -- Thêm các bản ghi khác ở đây...

-- Dữ liệu giả cho bảng comment
INSERT INTO `comment` (`content`, `image_id`, `user_id`)
VALUES
    ('Great Image', 1, 1),
    ('Nice', 1, 2),
    ('Love it', 2, 2);
    -- Thêm các bản ghi khác ở đây...

-- Dữ liệu giả cho bảng save_image
INSERT INTO `save_image` (`image_id`, `user_id`)
VALUES
    (1, 1),
    (2, 1),
    (1, 3);
    -- Thêm các bản ghi khác ở đây...
