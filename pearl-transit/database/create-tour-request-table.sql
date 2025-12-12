-- MySQL Script to create tour-request table in pearltransitdb database
-- Run this script in MySQL Workbench or MySQL command line

USE pearltransitdb;

-- Drop table if exists (optional, for testing)
-- DROP TABLE IF EXISTS `tour-request`;

-- Create tour-request table
CREATE TABLE IF NOT EXISTS `tour-request` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    adults INT DEFAULT 0,
    children INT DEFAULT 0,
    arrivalDate VARCHAR(50),
    daysCount INT,
    places LONGTEXT,
    needHotels VARCHAR(10),
    vehicle VARCHAR(100),
    activities LONGTEXT,
    contact VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    submittedAt DATETIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Pending',
    INDEX idx_email (email),
    INDEX idx_country (country),
    INDEX idx_submittedAt (submittedAt DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verify table creation
SHOW TABLES LIKE 'tour-request';
