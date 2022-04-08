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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `country_id` int NOT NULL,
  `level_id` int NOT NULL,
  `tier_id` int NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_nick` varchar(20) NOT NULL,
  `user_state` enum('Y','N','T','B') NOT NULL,
  `user_delete` enum('Y','N') NOT NULL,
  `user_win` int DEFAULT NULL,
  `user_lose` int DEFAULT NULL,
  `user_draw` int DEFAULT NULL,
  `user_profile_path` varchar(100) DEFAULT NULL,
  `user_score` int DEFAULT NULL,
  `user_signup_date` date NOT NULL,
  `user_lv2_date` date DEFAULT NULL,
  `user_lv3_date` date DEFAULT NULL,
  `user_lv4_date` date DEFAULT NULL,
  `default_lang` enum('E','K') NOT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`),
  UNIQUE KEY `user_nick` (`user_nick`),
  KEY `FK_Country_TO_User_1` (`country_id`),
  KEY `FK_Level_TO_User_1` (`level_id`),
  KEY `FK_Tier_TO_User_1` (`tier_id`),
  CONSTRAINT `FK_Country_TO_User_1` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`),
  CONSTRAINT `FK_Level_TO_User_1` FOREIGN KEY (`level_id`) REFERENCES `level` (`level_id`),
  CONSTRAINT `FK_Tier_TO_User_1` FOREIGN KEY (`tier_id`) REFERENCES `tier` (`tier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,1,1,'jiwoo@naver.com','지우','N','N',NULL,NULL,NULL,NULL,999,'2022-04-06',NULL,NULL,NULL,'K','더미'),(10,1,4,1,'blackbelt.mtk@gmail.com','태권도Love','Y','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/pngegg (91).png',999,'2022-04-06',NULL,NULL,NULL,'K','BlackBelt TK'),(11,1,2,1,'gongsp.sw@gmail.com','winter','Y','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/IMG_4070.JPG',999,'2022-04-06',NULL,NULL,NULL,'K','공부하는습관'),(12,1,1,1,'tmzkdlvm9876@gmail.com','anonymous12','N','N',NULL,NULL,NULL,NULL,999,'2022-04-06',NULL,NULL,NULL,'K','정지영'),(13,1,4,1,'darkstaryoung0406@gmail.com','최영운','Y','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/KakaoTalk_20210803_175057152.jpg',999,'2022-04-07',NULL,NULL,NULL,'K','최영운'),(14,1,4,1,'ckdn9595@gmail.com','태권도왕이지우','Y','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/jiwooprofile.jpg',999,'2022-04-07',NULL,NULL,NULL,'K','이지우'),(15,1,1,1,'tmdrl5661@gmail.com','하이','N','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','홍승기'),(16,1,1,1,'qweadzs22@gmail.com','박현우박','Y','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','박현우'),(17,1,1,1,'meanstrike94@gmail.com','주지환','B','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/KakaoTalk_20220107_222716022.jpg',999,'2022-04-07',NULL,NULL,NULL,'K','주지환'),(18,1,1,1,'jwkim.ap@gmail.com','anonymous18','Y','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','Jongwoo Kim'),(19,1,1,1,'chosnhn1@gmail.com','anonymous19','Y','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','Seonghan Cho'),(20,1,7,1,'yyss241@gmail.com','매에태권도하는양','Y','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/KakaoTalk_20220408_014844406.jpg',999,'2022-04-07',NULL,NULL,NULL,'K','최윤수'),(21,1,1,1,'bhaeun1105@gmail.com','anonymous21','B','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','Haeun Bae'),(22,1,1,1,'dudx45@gmail.com','임영택','N','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/lim.png',999,'2022-04-07',NULL,NULL,NULL,'K','yt lim'),(23,1,1,1,'gyh8781@gmail.com','anonymous23','N','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','코나안'),(24,1,1,1,'dayeleevvv@gmail.com','anonymous24','Y','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','이다예'),(25,1,1,1,'knh21kim@gmail.com','anonymous25','N','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','김남훈'),(26,1,1,1,'vkdlfl681@gmail.com','anonymous26','N','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','전건하'),(27,1,1,1,'diyudix@gmail.com','영영','N','N',NULL,NULL,NULL,NULL,999,'2022-04-07',NULL,NULL,NULL,'K','영영'),(28,1,1,1,'wnal3309@naver.com','멋져요','B','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/무한도전_짤_길.gif',999,'2022-04-07',NULL,NULL,NULL,'K','쥬'),(29,1,1,1,'1gj2wo3tjr@gmail.com','anonymous29','B','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/16b68b77220485402.gif',999,'2022-04-07',NULL,NULL,NULL,'K','허재석'),(30,1,1,1,'okqwaszx123@gmail.com','anonymous30','N','N',NULL,NULL,NULL,'https://j6a506.p.ssafy.io/uploads/성적증명서_이상우 (1).JPG',999,'2022-04-08',NULL,NULL,NULL,'K','이상우');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
