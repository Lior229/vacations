CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `userCode` int NOT NULL,
  `vacationCode` int NOT NULL,
  PRIMARY KEY (`userCode`,`vacationCode`),
  KEY `vacationCode_idx` (`vacationCode`),
  CONSTRAINT `userCode` FOREIGN KEY (`userCode`) REFERENCES `users` (`userCode`),
  CONSTRAINT `vacationCode` FOREIGN KEY (`vacationCode`) REFERENCES `vacations` (`vacationCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1,1),(2,1),(1,3),(2,3),(3,3),(2,4),(3,4),(3,5),(2,6),(3,9),(2,10),(3,10);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userCode` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`userCode`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin','admin@gmail.com','$2b$10$B5BQKIzibpl5VYUCD9UNXeHw78eZKv1.TceP.PaVUCs.QsWgmlo2m','Admin'),(2,'lior','lior','lior@gmail.com','$2b$10$8o6xlLzRoiGPpSyijp4s6uzhLc6ZoZ4sGzPdCNDok8OU9KMsnUlxu','User'),(3,'test1','test1','test1@gmail.com','$2b$10$p9T/pV0B0xg/ejzo00IyOerGEKfHEkAo5LPrAJJTpvASaN6xw22qS','User');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacationCode` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int NOT NULL,
  `imageName` varchar(45) NOT NULL,
  PRIMARY KEY (`vacationCode`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'rome','rome italy to eat pizza','2023-09-10','2023-09-23',2000,'rome.jpg'),(3,'london','harry potter studio','2021-01-20','2021-01-30',3500,'london.jpg'),(4,'Greece','Sapphire-blue waters, sumptuous seafood and laid-back locals','2023-08-11','2023-08-15',2500,'971374.jpg'),(5,'Eilat','very hot','2023-08-07','2023-08-10',1000,'eilat.jpg'),(6,'new york','the big apple','2023-08-07','2023-08-07',1547,'new-york.jpg'),(7,'berlin','beer and shopping','2023-09-28','2023-10-01',750,'berlin.jpg'),(8,'barcelona','Special buildings restaurants and small alleys','2023-09-12','2023-09-14',850,'barcelona.jpg'),(9,'Amsterdam','A colorful city with its many paths paved with painted mosaic stones and museums','2023-08-07','2023-08-09',300,'undefined'),(10,'bangkok','The capital city of Thailand','2023-08-13','2023-08-20',300,'bangkok.jpg'),(11,'paris','city of love','2023-10-01','2023-10-07',3500,'paris.jpg'),(12,'dubai','dubai','2023-10-08','2023-10-10',1200,'dubai.png'),(13,'dead sea','solt','2023-09-12','2023-09-14',300,'deadsea.jpg'),(14,'Jerusalem','Jerusalem','2023-08-20','2023-08-22',560,'Jerusalem.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-09 22:51:51
