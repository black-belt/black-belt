-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: j6a506.p.ssafy.io    Database: taekwondo
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `levelpoomsae`
--

DROP TABLE IF EXISTS `levelpoomsae`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levelpoomsae` (
  `poomsae_id` int NOT NULL,
  `level_id` int NOT NULL,
  `is_essential` enum('Y','N') NOT NULL,
  KEY `FK_PoomsaeAction_TO_LevelPoomsae_1` (`poomsae_id`),
  KEY `FK_Level_TO_LevelPoomsae_1` (`level_id`),
  CONSTRAINT `FK_Level_TO_LevelPoomsae_1` FOREIGN KEY (`level_id`) REFERENCES `level` (`level_id`),
  CONSTRAINT `FK_PoomsaeAction_TO_LevelPoomsae_1` FOREIGN KEY (`poomsae_id`) REFERENCES `poomsaeaction` (`poomsae_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levelpoomsae`
--

LOCK TABLES `levelpoomsae` WRITE;
/*!40000 ALTER TABLE `levelpoomsae` DISABLE KEYS */;
INSERT INTO `levelpoomsae` VALUES (1,4,'N'),(2,4,'N'),(3,4,'N'),(4,4,'N'),(5,4,'N'),(6,4,'N'),(7,4,'N'),(8,4,'Y'),(1,5,'N'),(2,5,'N'),(3,5,'N'),(4,5,'N'),(5,5,'N'),(6,5,'N'),(7,5,'N'),(8,5,'N'),(9,5,'Y'),(1,6,'N'),(2,6,'N'),(3,6,'N'),(4,6,'N'),(5,6,'N'),(6,6,'N'),(7,6,'N'),(8,6,'N'),(9,6,'N'),(10,6,'Y'),(1,7,'N'),(2,7,'N'),(3,7,'N'),(4,7,'N'),(5,7,'N'),(6,7,'N'),(7,7,'N'),(8,7,'N'),(9,7,'N'),(10,7,'N'),(11,7,'Y'),(1,8,'N'),(2,8,'N'),(3,8,'N'),(4,8,'N'),(5,8,'N'),(6,8,'N'),(7,8,'N'),(8,8,'N'),(9,8,'N'),(10,8,'N'),(11,8,'N'),(12,8,'Y'),(10,9,'N'),(11,9,'N'),(12,9,'N'),(13,9,'Y'),(11,10,'N'),(12,10,'N'),(13,10,'N'),(14,10,'Y'),(12,11,'N'),(13,11,'N'),(14,11,'N'),(15,11,'Y'),(13,12,'N'),(14,12,'N'),(15,12,'N'),(16,12,'Y');
/*!40000 ALTER TABLE `levelpoomsae` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:16:36
