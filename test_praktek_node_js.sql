-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2025 at 06:13 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_praktek_node_js`
--

-- --------------------------------------------------------

--
-- Table structure for table `balances`
--

CREATE TABLE `balances` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT 0.00,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `balances`
--

INSERT INTO `balances` (`id`, `user_id`, `balance`, `updated_at`) VALUES
(2, 5, '7000230.00', '2025-02-06 04:52:56');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `banner_name` varchar(255) NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `banner_name`, `banner_image`, `description`, `created_at`) VALUES
(1, 'Banner 1', 'https://example.com/banner1.jpg', 'deksrssi banner 1 https://example.com/page1', '2025-02-06 02:16:48'),
(2, 'Banner 2', 'https://example.com/banner2.jpg', 'deskripsi banner 2 https://example.com/page2', '2025-02-06 02:16:48');

-- --------------------------------------------------------

--
-- Table structure for table `jwt_tokens`
--

CREATE TABLE `jwt_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `token` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jwt_tokens`
--

INSERT INTO `jwt_tokens` (`id`, `user_id`, `token`, `created_at`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQHRlc3RwcmFrdGVrLmNvbSIsImlhdCI6MTczODgxNjg4MywiZXhwIjoxNzM4ODIwNDgzfQ.C2gBX_P74IlzWOJXn07X84txsU1t3b5kunOK0c6j3Zg', '2025-02-06 04:41:23'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQHRlc3RwcmFrdGVrLmNvbSIsImlhdCI6MTczODgxODA5NiwiZXhwIjoxNzM4ODIxNjk2fQ.Hh_aVilZeEebjw7-rpbXFN69DzilwyUn9P2F1tFewuc', '2025-02-06 05:01:36'),
(3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQHRlc3RwcmFrdGVrLmNvbSIsImlhdCI6MTczODgxODMxMCwiZXhwIjoxNzM4ODIxOTEwfQ.7x4ZdeFcgdiIdOG2rcJdRLCdeTQh5_x-qovifZS9gqg', '2025-02-06 05:05:10');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `user_id`, `profile_picture`, `bio`) VALUES
(1, 5, 'default-profile-image.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_code` varchar(50) NOT NULL,
  `service_icon` text DEFAULT NULL,
  `service_tariff` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `service_code`, `service_icon`, `service_tariff`) VALUES
(1, 'Pajak PBB', 'PAJAK', 'https://nutech-integrasi.app/dummy.jpg', 35000);

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `transaction_type` enum('TOPUP','PAYMENT') NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `service_code` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `invoice_number`, `transaction_type`, `total_amount`, `service_code`, `user_id`, `created_on`) VALUES
(1, '', 'TOPUP', '1000000.00', '', 5, '2025-02-06 03:29:40'),
(6, 'INV-1738813339813115', 'TOPUP', '1000000.00', 'TOPUP_SERVICE', 5, '2025-02-06 03:42:19'),
(7, 'INV-1738813354686114', 'TOPUP', '5000.00', 'TOPUP_SERVICE', 5, '2025-02-06 03:42:34'),
(8, 'INV-1738813626914-162', 'PAYMENT', '10000.00', 'PULSA', 5, '2025-02-06 03:47:06'),
(9, 'INV-1738813784661-585', 'PAYMENT', '10000.00', 'PULSA', 5, '2025-02-06 03:49:44'),
(10, 'INV-1738813919042-707', 'PAYMENT', '10000.00', 'PULSA', 5, '2025-02-06 03:51:59'),
(11, 'INV-1738814661692-105', 'PAYMENT', '40000.00', 'PAJAK', 5, '2025-02-06 04:04:21'),
(12, 'INV-1738814708029-199', 'PAYMENT', '35000.00', 'PAJAK', 5, '2025-02-06 04:05:08'),
(13, 'INV-1738817576002-590', 'TOPUP', '1000000.00', 'TOPUP_SERVICE', 5, '2025-02-06 04:52:56');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_history`
--

CREATE TABLE `transaction_history` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `transaction_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `transaction_type` enum('TOPUP','PAYMENT') DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaction_history`
--

INSERT INTO `transaction_history` (`id`, `user_id`, `transaction_id`, `amount`, `transaction_type`, `created_on`) VALUES
(1, 5, 9, '10000.00', 'PAYMENT', '2025-02-06 03:49:44'),
(2, 5, 10, '10000.00', 'PAYMENT', '2025-02-06 03:51:59'),
(3, 5, 11, '40000.00', 'PAYMENT', '2025-02-06 04:04:21'),
(4, 5, 12, '35000.00', 'PAYMENT', '2025-02-06 04:05:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `created_at`, `updated_at`, `first_name`, `last_name`) VALUES
(1, 'user@testpraktek.com', '$2a$10$YxCKccLI0fAE9Bgg6jZN6uK4T.xqPX/fN5YdAlRPje0fxqooOl1Ci', NULL, '2025-02-06 00:58:47', '2025-02-06 00:58:47', 'User', 'Bambang'),
(2, 'rahmat@testpraktek.com', '$2a$10$UNrWgIlzpAoMg/DkbxxZtOV98/xb81XHZNg4DTtihRf2xOTwVff/6', NULL, '2025-02-06 01:02:50', '2025-02-06 01:02:50', 'rahmat', 'dika'),
(5, 'arka@testpraktek.com', '$2a$10$0tzRZkrGQvqVaEg8lNzBduUQ84/MNJflxxpVG2fIMZ0cA6F3zz88e', NULL, '2025-02-06 03:08:42', '2025-02-06 03:08:42', 'Arka', 'juana');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `balances`
--
ALTER TABLE `balances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jwt_tokens`
--
ALTER TABLE `jwt_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `service_code` (`service_code`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoice_number` (`invoice_number`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaction_history`
--
ALTER TABLE `transaction_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `balances`
--
ALTER TABLE `balances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jwt_tokens`
--
ALTER TABLE `jwt_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `transaction_history`
--
ALTER TABLE `transaction_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `balances`
--
ALTER TABLE `balances`
  ADD CONSTRAINT `balances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `jwt_tokens`
--
ALTER TABLE `jwt_tokens`
  ADD CONSTRAINT `jwt_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `transaction_history`
--
ALTER TABLE `transaction_history`
  ADD CONSTRAINT `transaction_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transaction_history_ibfk_2` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
