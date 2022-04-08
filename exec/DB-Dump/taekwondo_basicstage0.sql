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
-- Table structure for table `basicstage`
--

DROP TABLE IF EXISTS `basicstage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basicstage` (
  `user_id` int NOT NULL,
  `basic_id` int NOT NULL,
  `basic_score` int DEFAULT NULL,
  `basic_clear` enum('Y','N') NOT NULL,
  `basic_date` date DEFAULT NULL,
  `basic_locked` enum('Y','N') NOT NULL,
  KEY `FK_User_TO_BasicStage_1` (`user_id`),
  KEY `FK_BasicAction_TO_BasicStage_1` (`basic_id`),
  CONSTRAINT `FK_BasicAction_TO_BasicStage_1` FOREIGN KEY (`basic_id`) REFERENCES `basicaction` (`basic_id`),
  CONSTRAINT `FK_User_TO_BasicStage_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basicstage`
--

LOCK TABLES `basicstage` WRITE;
/*!40000 ALTER TABLE `basicstage` DISABLE KEYS */;
INSERT INTO `basicstage` VALUES (1,1,NULL,'N',NULL,'N'),(1,2,NULL,'N',NULL,'N'),(1,3,NULL,'N',NULL,'Y'),(1,4,NULL,'N',NULL,'Y'),(1,5,NULL,'N',NULL,'Y'),(1,6,NULL,'N',NULL,'Y'),(1,7,NULL,'N',NULL,'Y'),(10,1,3,'Y','2022-04-06','N'),(10,2,3,'Y','2022-04-06','N'),(10,3,3,'Y','2022-04-06','N'),(10,4,3,'Y','2022-04-06','N'),(10,5,3,'Y','2022-04-07','N'),(10,6,3,'Y','2022-04-07','N'),(10,7,NULL,'N',NULL,'N'),(11,1,3,'Y','2022-04-07','N'),(11,2,3,'Y','2022-04-07','N'),(11,3,NULL,'N',NULL,'N'),(11,4,NULL,'N',NULL,'N'),(11,5,NULL,'N',NULL,'Y'),(11,6,NULL,'N',NULL,'Y'),(11,7,NULL,'N',NULL,'Y'),(12,1,NULL,'N',NULL,'N'),(12,2,NULL,'N',NULL,'N'),(12,3,NULL,'N',NULL,'Y'),(12,4,NULL,'N',NULL,'Y'),(12,5,NULL,'N',NULL,'Y'),(12,6,NULL,'N',NULL,'Y'),(12,7,NULL,'N',NULL,'Y'),(13,1,3,'Y','2022-04-07','N'),(13,2,3,'Y','2022-04-07','N'),(13,3,3,'Y','2022-04-07','N'),(13,4,3,'Y','2022-04-07','N'),(13,5,3,'Y','2022-04-07','N'),(13,6,3,'Y','2022-04-07','N'),(13,7,3,'Y','2022-04-07','N'),(14,1,3,'Y','2022-04-07','N'),(14,2,3,'Y','2022-04-07','N'),(14,3,3,'Y','2022-04-07','N'),(14,4,3,'Y','2022-04-07','N'),(14,5,3,'Y','2022-04-07','N'),(14,6,3,'Y','2022-04-07','N'),(14,7,3,'Y','2022-04-07','N'),(15,1,NULL,'N',NULL,'N'),(15,2,NULL,'N',NULL,'N'),(15,3,NULL,'N',NULL,'Y'),(15,4,NULL,'N',NULL,'Y'),(15,5,NULL,'N',NULL,'Y'),(15,6,NULL,'N',NULL,'Y'),(15,7,NULL,'N',NULL,'Y'),(16,1,NULL,'N',NULL,'N'),(16,2,NULL,'N',NULL,'N'),(16,3,NULL,'N',NULL,'Y'),(16,4,NULL,'N',NULL,'Y'),(16,5,NULL,'N',NULL,'Y'),(16,6,NULL,'N',NULL,'Y'),(16,7,NULL,'N',NULL,'Y'),(17,1,NULL,'N',NULL,'N'),(17,2,NULL,'N',NULL,'N'),(17,3,NULL,'N',NULL,'Y'),(17,4,NULL,'N',NULL,'Y'),(17,5,NULL,'N',NULL,'Y'),(17,6,NULL,'N',NULL,'Y'),(17,7,NULL,'N',NULL,'Y'),(18,1,3,'Y','2022-04-07','N'),(18,2,NULL,'N',NULL,'N'),(18,3,NULL,'N',NULL,'Y'),(18,4,NULL,'N',NULL,'Y'),(18,5,NULL,'N',NULL,'Y'),(18,6,NULL,'N',NULL,'Y'),(18,7,NULL,'N',NULL,'Y'),(19,1,NULL,'N',NULL,'N'),(19,2,NULL,'N',NULL,'N'),(19,3,NULL,'N',NULL,'Y'),(19,4,NULL,'N',NULL,'Y'),(19,5,NULL,'N',NULL,'Y'),(19,6,NULL,'N',NULL,'Y'),(19,7,NULL,'N',NULL,'Y'),(20,1,3,'Y','2022-04-07','N'),(20,2,3,'Y','2022-04-07','N'),(20,3,3,'Y','2022-04-07','N'),(20,4,3,'Y','2022-04-07','N'),(20,5,NULL,'N',NULL,'N'),(20,6,NULL,'N',NULL,'N'),(20,7,NULL,'N',NULL,'N'),(21,1,NULL,'N',NULL,'N'),(21,2,NULL,'N',NULL,'N'),(21,3,NULL,'N',NULL,'Y'),(21,4,NULL,'N',NULL,'Y'),(21,5,NULL,'N',NULL,'Y'),(21,6,NULL,'N',NULL,'Y'),(21,7,NULL,'N',NULL,'Y'),(22,1,3,'Y','2022-04-07','N'),(22,2,NULL,'N',NULL,'N'),(22,3,NULL,'N',NULL,'Y'),(22,4,NULL,'N',NULL,'Y'),(22,5,NULL,'N',NULL,'Y'),(22,6,NULL,'N',NULL,'Y'),(22,7,NULL,'N',NULL,'Y'),(23,1,NULL,'N',NULL,'N'),(23,2,NULL,'N',NULL,'N'),(23,3,NULL,'N',NULL,'Y'),(23,4,NULL,'N',NULL,'Y'),(23,5,NULL,'N',NULL,'Y'),(23,6,NULL,'N',NULL,'Y'),(23,7,NULL,'N',NULL,'Y'),(24,1,NULL,'N',NULL,'N'),(24,2,NULL,'N',NULL,'N'),(24,3,NULL,'N',NULL,'Y'),(24,4,NULL,'N',NULL,'Y'),(24,5,NULL,'N',NULL,'Y'),(24,6,NULL,'N',NULL,'Y'),(24,7,NULL,'N',NULL,'Y'),(25,1,NULL,'N',NULL,'N'),(25,2,1,'Y','2022-04-07','N'),(25,3,NULL,'N',NULL,'Y'),(25,4,NULL,'N',NULL,'Y'),(25,5,NULL,'N',NULL,'Y'),(25,6,NULL,'N',NULL,'Y'),(25,7,NULL,'N',NULL,'Y'),(26,1,NULL,'N',NULL,'N'),(26,2,NULL,'N',NULL,'N'),(26,3,NULL,'N',NULL,'Y'),(26,4,NULL,'N',NULL,'Y'),(26,5,NULL,'N',NULL,'Y'),(26,6,NULL,'N',NULL,'Y'),(26,7,NULL,'N',NULL,'Y'),(27,1,NULL,'N',NULL,'N'),(27,2,NULL,'N',NULL,'N'),(27,3,NULL,'N',NULL,'Y'),(27,4,NULL,'N',NULL,'Y'),(27,5,NULL,'N',NULL,'Y'),(27,6,NULL,'N',NULL,'Y'),(27,7,NULL,'N',NULL,'Y'),(28,1,NULL,'N',NULL,'N'),(28,2,NULL,'N',NULL,'N'),(28,3,NULL,'N',NULL,'Y'),(28,4,NULL,'N',NULL,'Y'),(28,5,NULL,'N',NULL,'Y'),(28,6,NULL,'N',NULL,'Y'),(28,7,NULL,'N',NULL,'Y'),(29,1,NULL,'N',NULL,'N'),(29,2,NULL,'N',NULL,'N'),(29,3,NULL,'N',NULL,'Y'),(29,4,NULL,'N',NULL,'Y'),(29,5,NULL,'N',NULL,'Y'),(29,6,NULL,'N',NULL,'Y'),(29,7,NULL,'N',NULL,'Y'),(30,1,NULL,'N',NULL,'N'),(30,2,NULL,'N',NULL,'N'),(30,3,NULL,'N',NULL,'Y'),(30,4,NULL,'N',NULL,'Y'),(30,5,NULL,'N',NULL,'Y'),(30,6,NULL,'N',NULL,'Y'),(30,7,NULL,'N',NULL,'Y');
/*!40000 ALTER TABLE `basicstage` ENABLE KEYS */;
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
