/*
SQLyog Ultimate v10.42 
MySQL - 5.5.5-10.4.10-MariaDB : Database - trappicdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`trappicdb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `trappicdb`;

/*Table structure for table `cartbl` */

DROP TABLE IF EXISTS `cartbl`;

CREATE TABLE `cartbl` (
  `cno` int(10) NOT NULL AUTO_INCREMENT,
  `dno` varchar(50) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `platenumber` varchar(50) DEFAULT NULL,
  `conductor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cno`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `cartbl` */

LOCK TABLES `cartbl` WRITE;

insert  into `cartbl`(`cno`,`dno`,`brand`,`model`,`color`,`platenumber`,`conductor`) values (1,'20002','mitsubishi','lamborgini','red','ABCD-QWE','mackmack2'),(2,'20002','mitsubishi','lamborgini','red','ABCD-QWEF','mackmack1'),(4,'20006','Ford','Expedition','Black','JNG0726','RJ4546');

UNLOCK TABLES;

/*Table structure for table `drivertbl` */

DROP TABLE IF EXISTS `drivertbl`;

CREATE TABLE `drivertbl` (
  `dno` int(10) NOT NULL AUTO_INCREMENT,
  `licence_no` varchar(50) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `mname` varchar(50) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `bday` varchar(50) DEFAULT NULL,
  `birthplace` varchar(50) DEFAULT NULL,
  `age` int(2) DEFAULT NULL,
  `dateregister` varchar(50) DEFAULT NULL,
  `usertype` varchar(50) DEFAULT NULL,
  `balance` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`dno`)
) ENGINE=InnoDB AUTO_INCREMENT=20007 DEFAULT CHARSET=latin1;

/*Data for the table `drivertbl` */

LOCK TABLES `drivertbl` WRITE;

insert  into `drivertbl`(`dno`,`licence_no`,`fname`,`lname`,`mname`,`nationality`,`sex`,`zip`,`pass`,`contact`,`email`,`address`,`bday`,`birthplace`,`age`,`dateregister`,`usertype`,`balance`) values (20002,'qw123','Mack Jaygee','Delos Santos','Grande','Australia','Male','4020','qweqwe','912389192','dmackjaygee0321@gmail.com','Street 24 Anderson Street City Scarborough State Full Queensland','2020-01-01','bulacan',20,'2020/03/14','Driver',200.00),(20003,'as123','Delos Santos','Marc Jericho','Grande','Australia','Male','4020','qweqwe','912389192','dmackjaygee0321@gmail.com','Street 24 Anderson Street City Scarborough State Full Queensland','2020-01-01','bulacan',20,'2020/06/07','Driver',2500.00),(20004,'zx123','Galang','Jhay','Grande','Australia','Male','4020','qweqwe','912389191','dmackjaygee0321@gmail.com','Street 24 Anderson Street City Scarborough State Full Queensland','2020-12-31','bulacan',20,'2020/06/13','Driver',2500.00),(20005,'we123','Karl','Villastiqui','Grande','Australia','Male','4020','qweqwe','1123123123','dmackjaygee0321@gmail.com','Street 24 Anderson Street City Scarborough State Full Queensland','2020-01-01','bulacan',20,'2020/06/21','Driver',2500.00),(20006,'N11100','Ryan Jey','Mercado','Nucum','Filipino','Male','1428','pass1234','09283673423','ryanjey@gmail.com','Manila','1992-01-01','manila',27,'2020/07/11','Driver',1500.00);

UNLOCK TABLES;

/*Table structure for table `enforcertbl` */

DROP TABLE IF EXISTS `enforcertbl`;

CREATE TABLE `enforcertbl` (
  `dno` int(10) NOT NULL AUTO_INCREMENT,
  `licence_no` varchar(50) NOT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `mname` varchar(50) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `bday` varchar(50) DEFAULT NULL,
  `birthplace` varchar(50) DEFAULT NULL,
  `age` int(2) DEFAULT NULL,
  `dateregister` varchar(50) DEFAULT NULL,
  `usertype` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`dno`)
) ENGINE=InnoDB AUTO_INCREMENT=100006 DEFAULT CHARSET=latin1;

/*Data for the table `enforcertbl` */

LOCK TABLES `enforcertbl` WRITE;

insert  into `enforcertbl`(`dno`,`licence_no`,`fname`,`lname`,`mname`,`nationality`,`sex`,`zip`,`pass`,`contact`,`email`,`address`,`bday`,`birthplace`,`age`,`dateregister`,`usertype`) values (100001,'ABCD-1234','Jerry','Delos Santos','Grande','Filipino','Male','4020','qweqwe','091236152736','dmackjaygee0321@gmail.com','palmera bulacan','2020-01-01','bulacan',21,'2020/03/16','Enforcer'),(100002,'qweqwe','Genes','Grande','Delos Santos','Australia','Male','4020','qweqwe','912389192','genes123@gmail.com','Street 24 Anderson Street City Scarborough State Full Queensland','2020-01-01','bulacan',20,'2020/03/16','Enforcer'),(100003,'ABCD','Danica','Albrando','R','Philippines','Female','3013','qweqwe','09169748201','danicajeanramizoalbrando@gmail.com','Norzagaray Bulacan','2003-03-29','Masbate',17,'2020/06/10','Enforcer'),(100004,'Australian Capital Territory','Delos Santos','Marc Jericho','Grande','Australia','Male','4020','qweqwe','912389191','dmackjaygee0321@gmail.com','Street 24 Anderson Street City Scarborough State Full Queensland','2020-12-31','bulacan',20,'2020/06/13','Enforcer'),(100005,'BM11223','Bryan','Mercado','Alcantara','Filipino','Male','1414','pass1234','77755588','bryan@gmail.com','mimiyoooo st. Quezon City','1998-10-02','Quezon City',21,'2020/07/11','Enforcer');

UNLOCK TABLES;

/*Creating a User Account*/
CREATE USER 'trappic'@'localhost' IDENTIFIED BY 'sa';
GRANT ALL PRIVILEGES ON *.* TO 'trappic'@'localhost';

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
