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
-- Table structure for table `basicaction`
--

DROP TABLE IF EXISTS `basicaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basicaction` (
  `basic_id` int NOT NULL,
  `basic_name` varchar(30) NOT NULL,
  `basic_name_e` varchar(50) NOT NULL,
  `basic_explain` varchar(300) DEFAULT NULL,
  `basic_explain_e` varchar(500) DEFAULT NULL,
  `basic_img_path` varchar(100) DEFAULT NULL,
  `basic_movie_path` varchar(100) DEFAULT NULL,
  `basic_answer` varchar(20) DEFAULT NULL,
  `basic_answer_index` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`basic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basicaction`
--

LOCK TABLES `basicaction` WRITE;
/*!40000 ALTER TABLE `basicaction` DISABLE KEYS */;
INSERT INTO `basicaction` VALUES (1,'기본준비서기','Basic Ready Stance','대부분의 품새를 시작하기 전에 취하는 준비자세. 모아서기에서 왼발을 한 발 길이로 넓히 고 두 손을 편 상태에서 명치 앞까지 끌어 올린 다음 숨을 내쉬며 두 주먹을 단전 앞 으로 이동하는 준비자세.','Prepared posture before most poomsae starts. It is a preparatory posture in which the left foot is extended to one foot length from the collector, the left hand is stretched out, the two hands are pulled up to the front of the solar plexus, and then the two fists are moved to the front of the Danjeon.','','https://www.youtube.com/watch?v=SG-Ap3vP-0E','Basic Ready Stance',NULL),(2,'몸통지르기','Inward Punch','주먹으로 목표물의 몸통을 지르는 기술.','The technique of hitting the target\'s torso with a fist.','','https://www.youtube.com/watch?v=AJJGBIDQ-E4','Inward Punch',NULL),(3,'얼굴막기','Upward Block','상대방의 공격을 아래에서 위로 올려 막는 기술. 팔목을 가슴 아래에서 위로 올려 상대방의 공격을 막는 기술.','The technique of blocking the opponent\'s attack from bottom to top. Technology to prevent the opponent from attacking by raising the wrist from below the chest.','','https://www.youtube.com/watch?v=RJgbzxlDvtY','Upward Block',NULL),(4,'몸통막기','Inward Block','상대방이 얼굴을 공격할 때 주먹이나 팔목 또는 손날을 이용해 막는 동작을 말한다.','It refers to a movement that blocks the other person\'s face using a fist, wrist, or hand blade.','','https://www.youtube.com/watch?v=S3nK8jNs3zE','Inward Block',NULL),(5,'앞굽이아래(내려)막기','Downward Block','상대방의 공격을 위에서 아래로 내려 막는 기술.  팔목으로 가슴 위에서 아래로 내려 막는 기술','The technique of blocking the opponent\'s attack from top to bottom. It\'s a technique to cover your chest with your wrist.','','https://www.youtube.com/watch?v=ZnIIPs_lFfk','Downward Block',NULL),(6,'앞차기','Front Kick','발로 앞에 있는 목표물을 가격하는 기술. 발등이나 앞축 또는 뒤축 등으로 상대방 의 턱이나 명치, 복부 등을 가격하는 기술','The technique of hitting a target in front of you with your feet. The technique of hitting the other person\'s chin, solar plexus, abdomen, etc. with the back of the foot, front, or back of the foot.','','https://www.youtube.com/watch?v=lWGvLA2Gk-s','Front Kick',NULL),(7,'돌려차기','Turning Kick','발을 안쪽으로 돌리며 목표물을 가격하 는 기술. 축이 되는 발을 틀며 엉덩이를 완전히 넣어 주어 앞축 또는 발등으로 상대방의 얼굴이나 몸통 등을 가격하는 기술','The technique of hitting the target by turning your foot inward. The technique of hitting the other person\'s face or body with the front axis or foot by turning the axillary foot and inserting the buttocks completely.','','https://www.youtube.com/watch?v=D05lIrktZ5w','Front Kick',NULL);
/*!40000 ALTER TABLE `basicaction` ENABLE KEYS */;
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
