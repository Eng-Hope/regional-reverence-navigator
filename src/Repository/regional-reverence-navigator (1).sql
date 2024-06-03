-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 01, 2024 at 03:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `regional-reverence-navigator`
--

-- --------------------------------------------------------

--
-- Table structure for table `Event`
--

CREATE TABLE `Event` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `startTime` varchar(191) NOT NULL,
  `endTime` varchar(191) NOT NULL,
  `startDate` varchar(191) DEFAULT NULL,
  `endDate` varchar(191) DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `description` varchar(191) DEFAULT NULL,
  `religionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Event`
--

INSERT INTO `Event` (`id`, `name`, `startTime`, `endTime`, `startDate`, `endDate`, `location`, `description`, `religionId`) VALUES
(1, 'CALVARY TEMPLE', '13:55', '13:56', '', '', '', '', 1),
(2, 'CALVARY TEMPLE', '14:09', '17:12', '2024-05-04', '2024-06-01', 'KIHESA IRINGA TANZANIA', 'you must all ware white closes', 1),
(3, 'CALVARY TEMPLE', '14:09', '17:12', '2024-05-04', '2024-06-01', 'KIHESA IRINGA TANZANIA', 'you must all ware white closes', 1),
(4, 'Sunday service', '17:41', '18:41', '', '', '', 'msisahau sadaka', 5);

-- --------------------------------------------------------

--
-- Table structure for table `Religion`
--

CREATE TABLE `Religion` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `category` enum('CHRISTIANITY','ISLAMIC') NOT NULL,
  `subCategory` varchar(191) DEFAULT NULL,
  `location` varchar(191) NOT NULL,
  `contact` varchar(191) NOT NULL,
  `imageUrl` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `userId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Religion`
--

INSERT INTO `Religion` (`id`, `name`, `category`, `subCategory`, `location`, `contact`, `imageUrl`, `createdAt`, `userId`) VALUES
(1, 'CALVARY TEMPLE', 'CHRISTIANITY', 'TAG', 'KIHESA IRINGA TANZANIA', '0718948681', '/religion/images/dbfa72c7-a4f7-43de-b731-58417a925cee-church.jpeg', '2024-04-30 08:29:52.082', '0ac1e21a-5ee8-4d8c-80cf-a3ec493741cb'),
(2, 'RUMAN KIHESA', 'CHRISTIANITY', 'ROMAN', 'KIHESA IRINGA TANZANIA', '0718948681', '/religion/images/353dcba4-1e24-48df-84f6-46c832bc6d4d-church.jpeg', '2024-04-30 09:18:47.515', '0ac1e21a-5ee8-4d8c-80cf-a3ec493741cb'),
(3, 'Frelimo', 'ISLAMIC', '', 'Tanzania Iringa Frelimo', '0717171717', '/religion/images/ce964c01-d039-4d54-8717-44543a184174-mosque.jpeg', '2024-05-01 05:54:39.351', '53f358f5-0a27-415a-9910-3a2c7fa2d3f5'),
(4, 'Tumain', 'ISLAMIC', '', 'Tanzania Iringa Tumaini', '0716161616', '/religion/images/4d6d6b8e-cdaa-4986-93e2-d6829cc3cebd-mosque2.jpeg', '2024-05-01 05:55:23.427', '53f358f5-0a27-415a-9910-3a2c7fa2d3f5'),
(5, 'ROMAN', 'CHRISTIANITY', '', 'ILULA', '0606060606', '/religion/images/04f8d44f-d8ed-420b-b314-c66967978cdf-mosque2.jpeg', '2024-05-01 13:41:01.058', '0ac1e21a-5ee8-4d8c-80cf-a3ec493741cb');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `email`, `name`, `password`, `role`) VALUES
('0ac1e21a-5ee8-4d8c-80cf-a3ec493741cb', 'me@gmail.com', 'hoperichard', '123456', 'USER'),
('344d88d6-d46f-41bd-9ed4-33a57f36094a', 'juma@gmail.com', 'Juma', '123456', 'USER'),
('42c98aae-6763-4558-8823-85c75eb24893', 'ishe12@gmail.com', 'hope', '12341234', 'USER'),
('46605e0a-4dc8-4649-aff4-1635e59dee02', 'hoperichard@gmail.com', 'hope', '123456', 'ADMIN'),
('4be85755-5950-4d8e-823a-e9ec9f338167', 'ishe1234@gmail.com', 'hope', '12341234', 'USER'),
('50a160b1-c9af-4c43-9fd0-b3cbad5411df', 'ishe@gmail.com', 'hope', '12341234', 'USER'),
('53f358f5-0a27-415a-9910-3a2c7fa2d3f5', 'jamali@gmail.com', 'jamali', '123456', 'USER'),
('57f57d92-1623-4512-aaaf-996b667a945f', 'hope123@gmail.com', 'hope', '12341234', 'USER'),
('88b2e175-3185-44d1-b8d6-b6cfaeeb6af7', 'ishe12346@gmail.com', 'hope', '12341234', 'USER');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('34a2ab27-0f0c-47f7-85b1-5c9804f0fe4b', '9ef44e8507c5905a1b116b8bd12b4f7b1401e12aaffcebebbb6e3103bd4a4590', '2024-04-23 21:04:56.650', '20240423210456_init', NULL, NULL, '2024-04-23 21:04:56.605', 1),
('9deda5cb-8813-46eb-a189-0e0e91a33ba5', '5029a78570b5c5e9633dc692755a598dd7dc109dd2adf5a60816541c22ea3f34', '2024-04-30 07:26:55.489', '20240430072655_religion', NULL, NULL, '2024-04-30 07:26:55.406', 1),
('a0eabec8-2c55-45b7-98c7-3e7772069d4b', '6c23722e6db76790d0de558ed8e1bb0c812b0988a139877ad57b2b8b1848d2a2', '2024-05-01 09:28:35.731', '20240501092835_event', NULL, NULL, '2024-05-01 09:28:35.632', 1),
('afe602f7-19a8-4dff-8a53-1bb628adb069', '14831dd04d691e075f8c32730e993169fa19268da71975e65e44221aac8c8464', '2024-05-01 10:45:32.148', '20240501104532_event_fix', NULL, NULL, '2024-05-01 10:45:32.074', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Event`
--
ALTER TABLE `Event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Event_religionId_fkey` (`religionId`);

--
-- Indexes for table `Religion`
--
ALTER TABLE `Religion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Religion_userId_fkey` (`userId`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Event`
--
ALTER TABLE `Event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Religion`
--
ALTER TABLE `Religion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Event`
--
ALTER TABLE `Event`
  ADD CONSTRAINT `Event_religionId_fkey` FOREIGN KEY (`religionId`) REFERENCES `Religion` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `Religion`
--
ALTER TABLE `Religion`
  ADD CONSTRAINT `Religion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
