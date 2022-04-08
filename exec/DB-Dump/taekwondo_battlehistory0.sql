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
-- Table structure for table `battlehistory`
--

DROP TABLE IF EXISTS `battlehistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `battlehistory` (
  `battlehistory_id` int NOT NULL AUTO_INCREMENT,
  `end_time` date DEFAULT NULL,
  `user_red_id` int NOT NULL,
  `user_blue_id` int NOT NULL,
  `red_win_lose_draw` enum('W','L','D') DEFAULT NULL,
  `red_tier_id` int NOT NULL,
  `blue_tier_id` int NOT NULL,
  `blue_country_id` int NOT NULL,
  `red_country_id` int NOT NULL,
  `session_name` varchar(100) DEFAULT NULL,
  `enemy_color` char(1) DEFAULT NULL,
  `win_lose_draw` char(1) DEFAULT NULL,
  PRIMARY KEY (`battlehistory_id`),
  KEY `FK_User_TO_BattleHistory_1` (`user_red_id`),
  KEY `FK_User_TO_BattleHistory_2` (`user_blue_id`),
  KEY `FK_Tier_TO_BattleHistory_1` (`red_tier_id`),
  KEY `FK_Tier_TO_BattleHistory_2` (`blue_tier_id`),
  KEY `FK_User_country_enemy_idx` (`blue_country_id`),
  KEY `FK_User_country_host_idx` (`red_country_id`),
  CONSTRAINT `FK_Tier_TO_BattleHistory_1` FOREIGN KEY (`red_tier_id`) REFERENCES `tier` (`tier_id`),
  CONSTRAINT `FK_Tier_TO_BattleHistory_2` FOREIGN KEY (`blue_tier_id`) REFERENCES `tier` (`tier_id`),
  CONSTRAINT `FK_User_country_enemy` FOREIGN KEY (`blue_country_id`) REFERENCES `country` (`country_id`),
  CONSTRAINT `FK_User_country_host` FOREIGN KEY (`red_country_id`) REFERENCES `country` (`country_id`),
  CONSTRAINT `FK_User_TO_BattleHistory_1` FOREIGN KEY (`user_red_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_User_TO_BattleHistory_2` FOREIGN KEY (`user_blue_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `battlehistory`
--

LOCK TABLES `battlehistory` WRITE;
/*!40000 ALTER TABLE `battlehistory` DISABLE KEYS */;
INSERT INTO `battlehistory` VALUES (11,NULL,11,12,'D',1,1,1,1,'battle11vs121',NULL,NULL),(12,NULL,11,12,'D',1,1,1,1,'battle11vs12123',NULL,NULL),(13,NULL,10,11,'D',1,1,1,1,'battle10vs1179e96d0d-7f68-4b32-bba5-2263b08a346f','\0','\0'),(14,NULL,10,11,'D',1,1,1,1,'battle10vs11157f1475-1128-410c-9130-388e47f07148','\0','\0'),(15,NULL,10,11,'D',1,1,1,1,'battle10vs119a280cd8-1556-49a7-8dac-e17ce5af8232','\0','\0'),(16,NULL,10,11,'D',1,1,1,1,'battle10vs11f076adae-66a4-43cf-8c05-bd4c874257d1','\0','\0'),(17,NULL,10,11,'D',1,1,1,1,'battle10vs1137f78d04-6b47-4222-aae3-d582a83b211c','\0','\0'),(18,NULL,10,11,'D',1,1,1,1,'battle10vs115214e223-a2c6-4340-85a0-8002f00a1509','\0','\0'),(19,NULL,15,16,'D',1,1,1,1,'battle15vs167f6598e8-03b7-4a99-8b0c-cca7df9bc00a','\0','\0'),(20,NULL,15,17,'D',1,1,1,1,'battle15vs17bb0284b8-5917-4215-b4f6-05ad8e2f78cc','\0','\0'),(21,NULL,15,17,'D',1,1,1,1,'battle15vs170fce3d08-f9ac-42eb-8a7b-7e4ac80f4ebf','\0','\0'),(22,NULL,15,21,'D',1,1,1,1,'battle15vs213d1bc948-2ead-4156-b734-1272cf47b9b6','\0','\0'),(23,NULL,10,14,'D',1,1,1,1,'battle10vs147d25e4a9-769c-4ec0-9b93-866bfb451107','\0','\0'),(24,NULL,13,14,'D',1,1,1,1,'battle13vs14fe4a1e04-2a71-44d6-97ab-84042936d130','\0','\0'),(25,NULL,10,11,'D',1,1,1,1,'battle10vs114a1b8e04-05b7-4311-9090-023c00a6a270','\0','\0'),(26,NULL,11,20,'D',1,1,1,1,'battle11vs20f0a85ed6-68b8-4b68-b4de-c6d4dd5b6c20','\0','\0'),(27,NULL,11,20,'D',1,1,1,1,'battle11vs20f491df8f-fdcb-4c30-b6c7-3e76f80df82c','\0','\0'),(28,NULL,15,16,'D',1,1,1,1,'battle15vs1638990cc0-ded4-4c1e-9803-92ee9a525617','\0','\0'),(29,NULL,15,16,'D',1,1,1,1,'battle15vs164950a99b-4ac7-4983-80f6-01dfc60f9a66','\0','\0'),(30,NULL,11,10,'D',1,1,1,1,'battle11vs1092464a4d-8db5-44d0-acfb-19e761aa2a4b','\0','\0'),(31,NULL,11,10,'D',1,1,1,1,'battle11vs100dd668c9-458d-4920-a825-ef7715bca325','\0','\0'),(32,NULL,13,14,'D',1,1,1,1,'battle13vs14fa1ffd3d-bbf3-44d5-af56-031bdcb5245e','\0','\0'),(33,NULL,11,10,'D',1,1,1,1,'battle11vs106ce377d4-e509-492b-8acf-59a47aad03ae','\0','\0'),(34,NULL,11,10,'D',1,1,1,1,'battle11vs107bf1d59e-debe-47e5-bf26-48eb0eb9f921','\0','\0'),(35,NULL,11,10,'D',1,1,1,1,'battle11vs100db43137-815d-418f-80d4-e7bfebeccdc8','\0','\0'),(36,NULL,11,10,'D',1,1,1,1,'battle11vs1045a53a07-4e11-4c26-b153-e9a14c6f78e1','\0','\0'),(37,NULL,11,10,'D',1,1,1,1,'battle11vs10634b228c-456d-490e-9526-4dd2f5b6ce38','\0','\0'),(38,NULL,11,10,'D',1,1,1,1,'battle11vs1031a60ad5-a2b1-422f-8079-bde24688df29','\0','\0'),(39,NULL,10,11,'D',1,1,1,1,'battle10vs11388ec260-6991-4d63-a693-ba29b5b18aee','\0','\0'),(40,NULL,10,11,'D',1,1,1,1,'battle10vs110f520747-ef80-4da1-b929-38d4b1a8751e','\0','\0'),(41,NULL,10,11,'D',1,1,1,1,'battle10vs11b48047b5-262b-478b-aedd-dbf2e3b56690','\0','\0'),(42,NULL,10,14,'D',1,1,1,1,'battle10vs1443a342a6-1f9d-4be0-9d1e-f66467e2c85f','\0','\0'),(43,NULL,10,14,'D',1,1,1,1,'battle10vs1443a342a6-1f9d-4be0-9d1e-f66467e2c85f','\0','\0'),(44,NULL,14,10,'D',1,1,1,1,'battle14vs10bae9dc89-7994-4c2a-af3f-86a36fb9e1a0','\0','\0'),(45,NULL,10,11,'D',1,1,1,1,'battle10vs11e5ab7665-036d-4b90-85b5-02f9c9456f3b','\0','\0'),(46,NULL,10,11,'D',1,1,1,1,'battle10vs111f50ea35-7865-42b9-8d7a-f6b97ecafa55','\0','\0'),(47,NULL,10,11,'D',1,1,1,1,'battle10vs113c059b6a-da23-40a4-9871-bdddfcb0de88','\0','\0'),(48,NULL,10,11,'D',1,1,1,1,'battle10vs11b6a784b7-be98-4a7d-a340-5ee738a5b179','\0','\0'),(49,NULL,10,11,'D',1,1,1,1,'battle10vs1107d9af3a-1fb6-48b3-b3db-29bececc89ea','\0','\0'),(50,NULL,26,25,'D',1,1,1,1,'battle26vs25a7c9bcf5-84e0-4b0c-bbf6-969bef486cd3','\0','\0'),(51,NULL,10,11,'D',1,1,1,1,'battle10vs1122a6fcc9-b851-4dc6-b762-7c4e08003db7','\0','\0'),(52,NULL,10,11,'D',1,1,1,1,'battle10vs11becc4fc8-ce56-4be4-ada1-67793919aa2f','\0','\0'),(53,'2022-04-08',13,14,'L',1,1,1,1,'battle13vs1419d7854e-a166-4597-9c37-cd9e1e83201f','\0','\0'),(54,NULL,13,14,'D',1,1,1,1,'battle13vs14b0a12765-ec2f-4728-8f85-ac314b60770e','\0','\0'),(55,NULL,10,13,'D',1,1,1,1,'battle10vs13ee01fa7e-c077-4719-bc03-ad794d5eda4d','\0','\0'),(56,NULL,10,13,'D',1,1,1,1,'battle10vs13255f4763-1a2d-45b0-86dd-b64b6b03d126','\0','\0'),(57,NULL,11,10,'D',1,1,1,1,'battle11vs10c14ca9a2-318f-4b60-b448-8929a15cf83e','\0','\0'),(58,NULL,11,10,'D',1,1,1,1,'battle11vs103a60ac7f-2588-4b19-9d7b-0358c9844348','\0','\0'),(59,NULL,10,11,'D',1,1,1,1,'battle10vs111639e044-91e9-4a77-99a3-0f6bbb29669c','\0','\0'),(60,'2022-04-08',14,10,'L',1,1,1,1,'battle14vs10aafe2447-c975-4a4d-9502-8b2de88cbe45','\0','\0'),(61,NULL,28,29,'D',1,1,1,1,'battle28vs291e962d06-2281-4d0a-99bd-3966bfdbb39e','\0','\0'),(62,NULL,29,28,'D',1,1,1,1,'battle29vs28d6d1eb4a-4130-4834-9d8a-b2c851a111eb','\0','\0'),(63,NULL,10,11,'D',1,1,1,1,'battle10vs11a6cbc090-dd63-46b7-8697-7a862652183c','\0','\0'),(64,NULL,27,22,'D',1,1,1,1,'battle27vs22edc417e9-89a8-44ce-be20-2e9ec88efed5','\0','\0'),(65,NULL,10,11,'D',1,1,1,1,'battle10vs1152e91a1c-ecba-423e-b045-7e4bc528ff34','\0','\0'),(66,NULL,12,11,'D',1,1,1,1,'battle12vs112c24f6e9-8b3f-4870-9f05-fd9f2c68c83e','\0','\0'),(67,'2022-04-08',14,10,'L',1,1,1,1,'battle14vs10d92ea262-e088-41de-8290-eb2c2d4d30df','\0','\0'),(68,NULL,12,11,'D',1,1,1,1,'battle12vs11fedcaade-8040-4901-bfe9-86450e6edd50','\0','\0'),(69,'2022-04-08',14,10,'L',1,1,1,1,'battle14vs10e340af62-5283-4498-8ea7-69af08fd95cd','\0','\0'),(70,NULL,14,10,'D',1,1,1,1,'battle14vs1061655e8e-9c86-4a74-bbcc-9bb0c7fdf08f','\0','\0'),(71,NULL,12,11,'D',1,1,1,1,'battle12vs110c069123-e196-4cd4-bc37-b1061e6d6682','\0','\0'),(72,NULL,12,11,'D',1,1,1,1,'battle12vs116c15a0ad-7f3f-4708-9867-0454ea2f4f0d','\0','\0'),(73,NULL,12,11,'D',1,1,1,1,'battle12vs1169b99a91-93da-4f04-8189-e08bb5b4077e','\0','\0'),(74,'2022-04-08',12,11,'L',1,1,1,1,'battle12vs117793346d-d909-4759-b808-a493549d3979','\0','\0'),(75,NULL,10,11,'D',1,1,1,1,'battle10vs118eb9f595-55f7-44cd-94f1-dae6dd787bbe','\0','\0'),(76,'2022-04-08',13,10,'W',1,1,1,1,'battle13vs10c37038c9-5abd-43b8-833a-1ba01d747c51','\0','\0'),(77,'2022-04-08',20,14,'L',1,1,1,1,'battle20vs14d4898753-2ccc-40ba-9de4-7cf5d85feae8','\0','\0'),(78,'2022-04-08',14,20,'W',1,1,1,1,'battle14vs20d5faede9-4499-44fb-b6c2-55d72dac51e0','\0','\0'),(79,'2022-04-08',20,14,'L',1,1,1,1,'battle20vs14c6358c16-b80e-46d3-bdab-37345d3d6109','\0','\0'),(80,'2022-04-08',13,14,'W',1,1,1,1,'battle13vs14e85871bd-dc34-44d1-be6c-8352732bcad6','\0','\0'),(81,'2022-04-08',13,14,'W',1,1,1,1,'battle13vs148788761e-956d-4bd2-a921-cf212401f857','\0','\0'),(82,NULL,14,13,'D',1,1,1,1,'battle14vs136568471b-5373-4acc-818c-7435fb0730fc','\0','\0'),(83,NULL,13,14,'D',1,1,1,1,'battle13vs14e80eadb9-bf0e-496f-b6f5-b59c28e4072d','\0','\0'),(84,NULL,13,14,'D',1,1,1,1,'battle13vs1491a4f813-16f6-4918-8cb7-6f5cfee5ad89','\0','\0'),(85,'2022-04-08',13,14,'W',1,1,1,1,'battle13vs1480fe164f-82b8-4442-b721-62786b4f1651','\0','\0'),(86,'2022-04-08',13,14,'W',1,1,1,1,'battle13vs14815cea2a-0073-4033-a451-6cfbabc3c744','\0','\0');
/*!40000 ALTER TABLE `battlehistory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-08 11:16:35
