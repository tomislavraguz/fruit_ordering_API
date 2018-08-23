CREATE DATABASE  IF NOT EXISTS `fruit_ordering` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `fruit_ordering`;
-- MySQL dump 10.16  Distrib 10.2.16-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: fruit_ordering
-- ------------------------------------------------------
-- Server version	10.2.16-MariaDB-10.2.16+maria~xenial

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fruit`
--

DROP TABLE IF EXISTS `fruit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fruit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `price_per_unit` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `label_UNIQUE` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fruit`
--

LOCK TABLES `fruit` WRITE;
/*!40000 ALTER TABLE `fruit` DISABLE KEYS */;
INSERT INTO `fruit` VALUES (1,'Mango',1000),(3,'Dorian',900),(7,'Apple',1200),(8,'Pear',15000),(9,'Keewee',2000),(10,'Blackberry',1000),(11,'Lime',1400),(12,'Grape',430),(13,'Peach',436),(14,'Bannana',3441),(15,'Passion fruit',533),(16,'Maracuia',900),(17,'Plum',50),(18,'Apricot',10000),(19,'Pomegranate',56000);
/*!40000 ALTER TABLE `fruit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `office_id` int(11) NOT NULL,
  `expected_time` datetime NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 1,
  `approved` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `order_order_office_FK_idx` (`office_id`),
  KEY `order_order_status_FK_idx` (`status_id`),
  CONSTRAINT `order_order_office_FK` FOREIGN KEY (`office_id`) REFERENCES `user_office` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `order_order_status_FK` FOREIGN KEY (`status_id`) REFERENCES `order_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (2,1,'2018-09-06 12:00:00',1,1),(3,1,'2018-08-31 00:00:00',4,1),(4,2,'2018-08-30 00:00:00',3,1),(5,10,'2018-08-30 00:00:00',1,0),(6,2,'2018-08-31 00:00:00',1,0),(7,15,'2018-08-31 00:00:00',1,0),(8,16,'2018-10-17 04:00:00',1,0),(9,15,'2018-08-31 00:00:00',1,0),(10,15,'2018-08-25 00:00:00',4,1),(11,15,'2018-09-13 00:00:00',2,0),(12,15,'2018-09-19 00:04:00',3,1),(13,12,'2018-08-25 00:00:00',4,0),(14,12,'2018-09-19 00:00:00',1,0),(15,13,'2018-08-28 00:00:00',3,1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_fruit`
--

DROP TABLE IF EXISTS `order_fruit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_fruit` (
  `order_id` int(11) NOT NULL,
  `fruit_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`fruit_id`),
  KEY `order_fruit_fruit_FK_idx` (`fruit_id`),
  CONSTRAINT `order_fruit_fruit_FK` FOREIGN KEY (`fruit_id`) REFERENCES `fruit` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_fruit`
--

LOCK TABLES `order_fruit` WRITE;
/*!40000 ALTER TABLE `order_fruit` DISABLE KEYS */;
INSERT INTO `order_fruit` VALUES (2,1,5),(3,3,4),(3,7,5),(4,3,4),(4,7,6),(5,8,7),(5,11,7),(5,16,10),(5,19,1),(6,3,4),(6,12,4),(6,13,7),(6,16,5),(7,3,8),(7,9,4),(7,12,5),(7,13,1),(7,14,1),(8,7,4),(8,9,4),(8,11,6),(8,13,1),(8,15,1),(9,8,10),(9,9,6),(9,10,3),(9,12,4),(9,13,5),(10,9,7),(10,11,3),(10,12,5),(11,9,3),(11,11,7),(11,14,6),(11,17,4),(12,7,5),(12,8,5),(12,15,6),(13,8,1),(13,11,2),(13,12,3),(13,14,6),(13,15,5),(14,8,3),(14,10,4),(14,11,6),(14,12,5),(14,13,8),(15,3,6),(15,11,1),(15,17,9);
/*!40000 ALTER TABLE `order_fruit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'in progress'),(2,'in transit'),(3,'complete'),(4,'canceled');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `priviledge_level` int(11) NOT NULL DEFAULT 2,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'frooto',1,'frooto@outlook.com','','$2a$08$U3T0hMHAWXFCm4fmlFhER.61AI2EDdJLDwWZroDDpL/cLb7aYu8la'),(2,'konzum',2,'konzum@konzum.com','091-152-7074','$2a$08$m.u7Eop9vAY18VbUB5y5UO/oMdn3MmCwOkeuMuFybuh9Jf0n0Gqoi'),(3,'lidl',2,'lidl@lidl.com','091-152-7074','$2a$08$SupB8QuLYal0J5hIf3eELOfzXB8LFTylFCRruUONQWKe.cr5u87qy'),(4,'span',2,'span@span.com','091-152-7074','$2a$08$6xWkaHcExWFeLKQIn4rKjeIDdP8HfFo0JkEa6TGYB5hshFZfGJPKK'),(5,'boso',2,'boso@boso.com','0999994','$2a$08$rQQwn4w.79pIobssDmEiWeip6tQnfNpBFWeyvkwfVtgvOebdgCVlm'),(6,'Coadrija',2,'co@co.vom','213213','$2a$08$qJTEY3vHgIzIEz1jmj/cHeNg4Ofb.s8HKTUuO6gWUgZP/n2OVvLqu'),(7,'Frutto di Mare',2,'fruto@mate.com','2412414','$2a$08$VmbtiOvDIR.ciSvsxJfss.mlWHD/BwkVRZAvrwe8l0ZoadYVbR8qy'),(9,'Blue Ant',2,'blueant@blueant.com','0912935230','$2a$08$J7Z2BK6eeutVVhRmiQH.rea1ktp/4HxF7b0KkHARihAu9/42yR6k6'),(10,'NASA',2,'nasa@nasa.com','3-2123194','$2a$08$dwtjPFX/LIyiGbfpPwzPC.XEx0e0ZbSqfENwXDBWN1bXjO3wMwsJa'),(11,'Alarm automatika',2,'alarm@automatika.com','2391031283','$2a$08$GK6K2JR7mGRzyPQqGmzFXeK3sYeZjUvtL.5lEm549EHxq8UJcmSVa');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_office`
--

DROP TABLE IF EXISTS `user_office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_office` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `address_UNIQUE` (`address`),
  KEY `user_office_user_FK_idx` (`user_id`),
  CONSTRAINT `user_office_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_office`
--

LOCK TABLES `user_office` WRITE;
/*!40000 ALTER TABLE `user_office` DISABLE KEYS */;
INSERT INTO `user_office` VALUES (1,'Precko',2),(2,'Vodnikova',2),(3,'Vrpolje',5),(4,'Zadar',5),(5,'rijeka',6),(6,'Brazil',6),(8,'Split',7),(9,'Bastijanova',7),(10,'China Town',2),(11,'Braca Rijeka',9),(12,'CTK Rijeka',9),(13,'Kolodvor rijeka, 20 narodnih heroja',9),(14,' Oak street 20, Columbia',10),(15,'116 Park Place, Brooklyn, New York, USA',10),(16,'North pole',10),(17,'Vatifoviceva 25',11),(18,'Kurun arem, 27 Dubai',11),(19,'Aleksandrijska 27, Makedonija',11);
/*!40000 ALTER TABLE `user_office` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-08-23 22:10:07
