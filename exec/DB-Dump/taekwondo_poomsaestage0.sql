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
-- Table structure for table `poomsaestage`
--

DROP TABLE IF EXISTS `poomsaestage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poomsaestage` (
  `user_id` int NOT NULL,
  `poomsae_id` int NOT NULL,
  `poomsae_score` int DEFAULT NULL,
  `poomsae_clear` enum('Y','N') NOT NULL,
  `poomsae_date` date DEFAULT NULL,
  `poomsae_locked` enum('Y','N') NOT NULL,
  KEY `FK_User_TO_PoomsaeStage_1` (`user_id`),
  KEY `FK_PoomsaeAction_TO_PoomsaeStage_1` (`poomsae_id`),
  CONSTRAINT `FK_PoomsaeAction_TO_PoomsaeStage_1` FOREIGN KEY (`poomsae_id`) REFERENCES `poomsaeaction` (`poomsae_id`),
  CONSTRAINT `FK_User_TO_PoomsaeStage_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poomsaestage`
--

LOCK TABLES `poomsaestage` WRITE;
/*!40000 ALTER TABLE `poomsaestage` DISABLE KEYS */;
INSERT INTO `poomsaestage` VALUES (1,1,NULL,'N',NULL,'Y'),(1,2,NULL,'N',NULL,'Y'),(1,3,NULL,'N',NULL,'Y'),(1,4,NULL,'N',NULL,'Y'),(1,5,NULL,'N',NULL,'Y'),(1,6,NULL,'N',NULL,'Y'),(1,7,NULL,'N',NULL,'Y'),(1,8,NULL,'N',NULL,'Y'),(1,9,NULL,'N',NULL,'Y'),(1,10,NULL,'N',NULL,'Y'),(1,11,NULL,'N',NULL,'Y'),(1,12,NULL,'N',NULL,'Y'),(1,13,NULL,'N',NULL,'Y'),(1,14,NULL,'N',NULL,'Y'),(1,15,NULL,'N',NULL,'Y'),(1,16,NULL,'N',NULL,'Y'),(10,1,NULL,'N',NULL,'N'),(10,2,NULL,'N',NULL,'N'),(10,3,NULL,'N',NULL,'N'),(10,4,NULL,'N',NULL,'N'),(10,5,NULL,'N',NULL,'N'),(10,6,NULL,'N',NULL,'N'),(10,7,NULL,'N',NULL,'N'),(10,8,NULL,'N',NULL,'N'),(10,9,NULL,'N',NULL,'N'),(10,10,NULL,'N',NULL,'Y'),(10,11,NULL,'N',NULL,'Y'),(10,12,NULL,'N',NULL,'Y'),(10,13,NULL,'N',NULL,'Y'),(10,14,NULL,'N',NULL,'Y'),(10,15,NULL,'N',NULL,'Y'),(10,16,NULL,'N',NULL,'Y'),(11,1,NULL,'N',NULL,'Y'),(11,2,NULL,'N',NULL,'Y'),(11,3,NULL,'N',NULL,'Y'),(11,4,NULL,'N',NULL,'Y'),(11,5,NULL,'N',NULL,'Y'),(11,6,NULL,'N',NULL,'Y'),(11,7,NULL,'N',NULL,'Y'),(11,8,NULL,'N',NULL,'Y'),(11,9,NULL,'N',NULL,'Y'),(11,10,NULL,'N',NULL,'Y'),(11,11,NULL,'N',NULL,'Y'),(11,12,NULL,'N',NULL,'Y'),(11,13,NULL,'N',NULL,'Y'),(11,14,NULL,'N',NULL,'Y'),(11,15,NULL,'N',NULL,'Y'),(11,16,NULL,'N',NULL,'Y'),(12,1,NULL,'N',NULL,'Y'),(12,2,NULL,'N',NULL,'Y'),(12,3,NULL,'N',NULL,'Y'),(12,4,NULL,'N',NULL,'Y'),(12,5,NULL,'N',NULL,'Y'),(12,6,NULL,'N',NULL,'Y'),(12,7,NULL,'N',NULL,'Y'),(12,8,NULL,'N',NULL,'Y'),(12,9,NULL,'N',NULL,'Y'),(12,10,NULL,'N',NULL,'Y'),(12,11,NULL,'N',NULL,'Y'),(12,12,NULL,'N',NULL,'Y'),(12,13,NULL,'N',NULL,'Y'),(12,14,NULL,'N',NULL,'Y'),(12,15,NULL,'N',NULL,'Y'),(12,16,NULL,'N',NULL,'Y'),(13,1,3,'Y','2022-04-07','N'),(13,2,NULL,'N',NULL,'N'),(13,3,NULL,'N',NULL,'N'),(13,4,NULL,'N',NULL,'N'),(13,5,NULL,'N',NULL,'N'),(13,6,NULL,'N',NULL,'N'),(13,7,NULL,'N',NULL,'N'),(13,8,NULL,'N',NULL,'N'),(13,9,NULL,'N',NULL,'Y'),(13,10,NULL,'N',NULL,'Y'),(13,11,NULL,'N',NULL,'Y'),(13,12,NULL,'N',NULL,'Y'),(13,13,NULL,'N',NULL,'Y'),(13,14,NULL,'N',NULL,'Y'),(13,15,NULL,'N',NULL,'Y'),(13,16,NULL,'N',NULL,'Y'),(14,1,NULL,'N',NULL,'N'),(14,2,NULL,'N',NULL,'N'),(14,3,NULL,'N',NULL,'N'),(14,4,NULL,'N',NULL,'N'),(14,5,NULL,'N',NULL,'N'),(14,6,NULL,'N',NULL,'N'),(14,7,NULL,'N',NULL,'N'),(14,8,NULL,'N',NULL,'N'),(14,9,NULL,'N',NULL,'Y'),(14,10,NULL,'N',NULL,'Y'),(14,11,NULL,'N',NULL,'Y'),(14,12,NULL,'N',NULL,'Y'),(14,13,NULL,'N',NULL,'Y'),(14,14,NULL,'N',NULL,'Y'),(14,15,NULL,'N',NULL,'Y'),(14,16,NULL,'N',NULL,'Y'),(15,1,NULL,'N',NULL,'Y'),(15,2,NULL,'N',NULL,'Y'),(15,3,NULL,'N',NULL,'Y'),(15,4,NULL,'N',NULL,'Y'),(15,5,NULL,'N',NULL,'Y'),(15,6,NULL,'N',NULL,'Y'),(15,7,NULL,'N',NULL,'Y'),(15,8,NULL,'N',NULL,'Y'),(15,9,NULL,'N',NULL,'Y'),(15,10,NULL,'N',NULL,'Y'),(15,11,NULL,'N',NULL,'Y'),(15,12,NULL,'N',NULL,'Y'),(15,13,NULL,'N',NULL,'Y'),(15,14,NULL,'N',NULL,'Y'),(15,15,NULL,'N',NULL,'Y'),(15,16,NULL,'N',NULL,'Y'),(16,1,NULL,'N',NULL,'Y'),(16,2,NULL,'N',NULL,'Y'),(16,3,NULL,'N',NULL,'Y'),(16,4,NULL,'N',NULL,'Y'),(16,5,NULL,'N',NULL,'Y'),(16,6,NULL,'N',NULL,'Y'),(16,7,NULL,'N',NULL,'Y'),(16,8,NULL,'N',NULL,'Y'),(16,9,NULL,'N',NULL,'Y'),(16,10,NULL,'N',NULL,'Y'),(16,11,NULL,'N',NULL,'Y'),(16,12,NULL,'N',NULL,'Y'),(16,13,NULL,'N',NULL,'Y'),(16,14,NULL,'N',NULL,'Y'),(16,15,NULL,'N',NULL,'Y'),(16,16,NULL,'N',NULL,'Y'),(17,1,NULL,'N',NULL,'Y'),(17,2,NULL,'N',NULL,'Y'),(17,3,NULL,'N',NULL,'Y'),(17,4,NULL,'N',NULL,'Y'),(17,5,NULL,'N',NULL,'Y'),(17,6,NULL,'N',NULL,'Y'),(17,7,NULL,'N',NULL,'Y'),(17,8,NULL,'N',NULL,'Y'),(17,9,NULL,'N',NULL,'Y'),(17,10,NULL,'N',NULL,'Y'),(17,11,NULL,'N',NULL,'Y'),(17,12,NULL,'N',NULL,'Y'),(17,13,NULL,'N',NULL,'Y'),(17,14,NULL,'N',NULL,'Y'),(17,15,NULL,'N',NULL,'Y'),(17,16,NULL,'N',NULL,'Y'),(18,1,NULL,'N',NULL,'Y'),(18,2,NULL,'N',NULL,'Y'),(18,3,NULL,'N',NULL,'Y'),(18,4,NULL,'N',NULL,'Y'),(18,5,NULL,'N',NULL,'Y'),(18,6,NULL,'N',NULL,'Y'),(18,7,NULL,'N',NULL,'Y'),(18,8,NULL,'N',NULL,'Y'),(18,9,NULL,'N',NULL,'Y'),(18,10,NULL,'N',NULL,'Y'),(18,11,NULL,'N',NULL,'Y'),(18,12,NULL,'N',NULL,'Y'),(18,13,NULL,'N',NULL,'Y'),(18,14,NULL,'N',NULL,'Y'),(18,15,NULL,'N',NULL,'Y'),(18,16,NULL,'N',NULL,'Y'),(19,1,NULL,'N',NULL,'Y'),(19,2,NULL,'N',NULL,'Y'),(19,3,NULL,'N',NULL,'Y'),(19,4,NULL,'N',NULL,'Y'),(19,5,NULL,'N',NULL,'Y'),(19,6,NULL,'N',NULL,'Y'),(19,7,NULL,'N',NULL,'Y'),(19,8,NULL,'N',NULL,'Y'),(19,9,NULL,'N',NULL,'Y'),(19,10,NULL,'N',NULL,'Y'),(19,11,NULL,'N',NULL,'Y'),(19,12,NULL,'N',NULL,'Y'),(19,13,NULL,'N',NULL,'Y'),(19,14,NULL,'N',NULL,'Y'),(19,15,NULL,'N',NULL,'Y'),(19,16,NULL,'N',NULL,'Y'),(20,1,NULL,'N',NULL,'N'),(20,2,NULL,'N',NULL,'N'),(20,3,NULL,'N',NULL,'N'),(20,4,NULL,'N',NULL,'N'),(20,5,NULL,'N',NULL,'N'),(20,6,NULL,'N',NULL,'N'),(20,7,NULL,'N',NULL,'N'),(20,8,NULL,'N',NULL,'N'),(20,9,NULL,'N',NULL,'N'),(20,10,NULL,'N',NULL,'N'),(20,11,NULL,'N',NULL,'N'),(20,12,NULL,'N',NULL,'Y'),(20,13,NULL,'N',NULL,'Y'),(20,14,NULL,'N',NULL,'Y'),(20,15,NULL,'N',NULL,'Y'),(20,16,NULL,'N',NULL,'Y'),(21,1,NULL,'N',NULL,'Y'),(21,2,NULL,'N',NULL,'Y'),(21,3,NULL,'N',NULL,'Y'),(21,4,NULL,'N',NULL,'Y'),(21,5,NULL,'N',NULL,'Y'),(21,6,NULL,'N',NULL,'Y'),(21,7,NULL,'N',NULL,'Y'),(21,8,NULL,'N',NULL,'Y'),(21,9,NULL,'N',NULL,'Y'),(21,10,NULL,'N',NULL,'Y'),(21,11,NULL,'N',NULL,'Y'),(21,12,NULL,'N',NULL,'Y'),(21,13,NULL,'N',NULL,'Y'),(21,14,NULL,'N',NULL,'Y'),(21,15,NULL,'N',NULL,'Y'),(21,16,NULL,'N',NULL,'Y'),(22,1,NULL,'N',NULL,'Y'),(22,2,NULL,'N',NULL,'Y'),(22,3,NULL,'N',NULL,'Y'),(22,4,NULL,'N',NULL,'Y'),(22,5,NULL,'N',NULL,'Y'),(22,6,NULL,'N',NULL,'Y'),(22,7,NULL,'N',NULL,'Y'),(22,8,NULL,'N',NULL,'Y'),(22,9,NULL,'N',NULL,'Y'),(22,10,NULL,'N',NULL,'Y'),(22,11,NULL,'N',NULL,'Y'),(22,12,NULL,'N',NULL,'Y'),(22,13,NULL,'N',NULL,'Y'),(22,14,NULL,'N',NULL,'Y'),(22,15,NULL,'N',NULL,'Y'),(22,16,NULL,'N',NULL,'Y'),(23,1,NULL,'N',NULL,'Y'),(23,2,NULL,'N',NULL,'Y'),(23,3,NULL,'N',NULL,'Y'),(23,4,NULL,'N',NULL,'Y'),(23,5,NULL,'N',NULL,'Y'),(23,6,NULL,'N',NULL,'Y'),(23,7,NULL,'N',NULL,'Y'),(23,8,NULL,'N',NULL,'Y'),(23,9,NULL,'N',NULL,'Y'),(23,10,NULL,'N',NULL,'Y'),(23,11,NULL,'N',NULL,'Y'),(23,12,NULL,'N',NULL,'Y'),(23,13,NULL,'N',NULL,'Y'),(23,14,NULL,'N',NULL,'Y'),(23,15,NULL,'N',NULL,'Y'),(23,16,NULL,'N',NULL,'Y'),(24,1,NULL,'N',NULL,'Y'),(24,2,NULL,'N',NULL,'Y'),(24,3,NULL,'N',NULL,'Y'),(24,4,NULL,'N',NULL,'Y'),(24,5,NULL,'N',NULL,'Y'),(24,6,NULL,'N',NULL,'Y'),(24,7,NULL,'N',NULL,'Y'),(24,8,NULL,'N',NULL,'Y'),(24,9,NULL,'N',NULL,'Y'),(24,10,NULL,'N',NULL,'Y'),(24,11,NULL,'N',NULL,'Y'),(24,12,NULL,'N',NULL,'Y'),(24,13,NULL,'N',NULL,'Y'),(24,14,NULL,'N',NULL,'Y'),(24,15,NULL,'N',NULL,'Y'),(24,16,NULL,'N',NULL,'Y'),(25,1,NULL,'N',NULL,'Y'),(25,2,NULL,'N',NULL,'Y'),(25,3,NULL,'N',NULL,'Y'),(25,4,NULL,'N',NULL,'Y'),(25,5,NULL,'N',NULL,'Y'),(25,6,NULL,'N',NULL,'Y'),(25,7,NULL,'N',NULL,'Y'),(25,8,NULL,'N',NULL,'Y'),(25,9,NULL,'N',NULL,'Y'),(25,10,NULL,'N',NULL,'Y'),(25,11,NULL,'N',NULL,'Y'),(25,12,NULL,'N',NULL,'Y'),(25,13,NULL,'N',NULL,'Y'),(25,14,NULL,'N',NULL,'Y'),(25,15,NULL,'N',NULL,'Y'),(25,16,NULL,'N',NULL,'Y'),(26,1,NULL,'N',NULL,'Y'),(26,2,NULL,'N',NULL,'Y'),(26,3,NULL,'N',NULL,'Y'),(26,4,NULL,'N',NULL,'Y'),(26,5,NULL,'N',NULL,'Y'),(26,6,NULL,'N',NULL,'Y'),(26,7,NULL,'N',NULL,'Y'),(26,8,NULL,'N',NULL,'Y'),(26,9,NULL,'N',NULL,'Y'),(26,10,NULL,'N',NULL,'Y'),(26,11,NULL,'N',NULL,'Y'),(26,12,NULL,'N',NULL,'Y'),(26,13,NULL,'N',NULL,'Y'),(26,14,NULL,'N',NULL,'Y'),(26,15,NULL,'N',NULL,'Y'),(26,16,NULL,'N',NULL,'Y'),(27,1,NULL,'N',NULL,'Y'),(27,2,NULL,'N',NULL,'Y'),(27,3,NULL,'N',NULL,'Y'),(27,4,NULL,'N',NULL,'Y'),(27,5,NULL,'N',NULL,'Y'),(27,6,NULL,'N',NULL,'Y'),(27,7,NULL,'N',NULL,'Y'),(27,8,NULL,'N',NULL,'Y'),(27,9,NULL,'N',NULL,'Y'),(27,10,NULL,'N',NULL,'Y'),(27,11,NULL,'N',NULL,'Y'),(27,12,NULL,'N',NULL,'Y'),(27,13,NULL,'N',NULL,'Y'),(27,14,NULL,'N',NULL,'Y'),(27,15,NULL,'N',NULL,'Y'),(27,16,NULL,'N',NULL,'Y'),(28,1,NULL,'N',NULL,'Y'),(28,2,NULL,'N',NULL,'Y'),(28,3,NULL,'N',NULL,'Y'),(28,4,NULL,'N',NULL,'Y'),(28,5,NULL,'N',NULL,'Y'),(28,6,NULL,'N',NULL,'Y'),(28,7,NULL,'N',NULL,'Y'),(28,8,NULL,'N',NULL,'Y'),(28,9,NULL,'N',NULL,'Y'),(28,10,NULL,'N',NULL,'Y'),(28,11,NULL,'N',NULL,'Y'),(28,12,NULL,'N',NULL,'Y'),(28,13,NULL,'N',NULL,'Y'),(28,14,NULL,'N',NULL,'Y'),(28,15,NULL,'N',NULL,'Y'),(28,16,NULL,'N',NULL,'Y'),(29,1,NULL,'N',NULL,'Y'),(29,2,NULL,'N',NULL,'Y'),(29,3,NULL,'N',NULL,'Y'),(29,4,NULL,'N',NULL,'Y'),(29,5,NULL,'N',NULL,'Y'),(29,6,NULL,'N',NULL,'Y'),(29,7,NULL,'N',NULL,'Y'),(29,8,NULL,'N',NULL,'Y'),(29,9,NULL,'N',NULL,'Y'),(29,10,NULL,'N',NULL,'Y'),(29,11,NULL,'N',NULL,'Y'),(29,12,NULL,'N',NULL,'Y'),(29,13,NULL,'N',NULL,'Y'),(29,14,NULL,'N',NULL,'Y'),(29,15,NULL,'N',NULL,'Y'),(29,16,NULL,'N',NULL,'Y'),(30,1,NULL,'N',NULL,'Y'),(30,2,NULL,'N',NULL,'Y'),(30,3,NULL,'N',NULL,'Y'),(30,4,NULL,'N',NULL,'Y'),(30,5,NULL,'N',NULL,'Y'),(30,6,NULL,'N',NULL,'Y'),(30,7,NULL,'N',NULL,'Y'),(30,8,NULL,'N',NULL,'Y'),(30,9,NULL,'N',NULL,'Y'),(30,10,NULL,'N',NULL,'Y'),(30,11,NULL,'N',NULL,'Y'),(30,12,NULL,'N',NULL,'Y'),(30,13,NULL,'N',NULL,'Y'),(30,14,NULL,'N',NULL,'Y'),(30,15,NULL,'N',NULL,'Y'),(30,16,NULL,'N',NULL,'Y');
/*!40000 ALTER TABLE `poomsaestage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:16:33