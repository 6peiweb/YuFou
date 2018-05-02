# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.20)
# Database: WuChat
# Generation Time: 2018-05-02 12:09:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Friend
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Friend`;

CREATE TABLE `Friend` (
  `F_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `F_FriendID` int(11) unsigned NOT NULL COMMENT '好友ID',
  `F_UserID` int(11) unsigned NOT NULL COMMENT '用户ID',
  `F_Name` varchar(20) DEFAULT NULL COMMENT '好友备注昵称',
  `F_FriendGroupID` int(11) unsigned NOT NULL COMMENT '好友所属组ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`F_ID`),
  KEY `F_FriendID` (`F_FriendID`),
  KEY `F_UserID` (`F_UserID`),
  KEY `F_FriendGroupID` (`F_FriendGroupID`),
  CONSTRAINT `friend_ibfk_1` FOREIGN KEY (`F_FriendID`) REFERENCES `user` (`U_ID`),
  CONSTRAINT `friend_ibfk_2` FOREIGN KEY (`F_UserID`) REFERENCES `user` (`U_ID`),
  CONSTRAINT `friend_ibfk_3` FOREIGN KEY (`F_FriendGroupID`) REFERENCES `Friend_Group` (`FG_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='好友表';

LOCK TABLES `Friend` WRITE;
/*!40000 ALTER TABLE `Friend` DISABLE KEYS */;

INSERT INTO `Friend` (`F_ID`, `F_FriendID`, `F_UserID`, `F_Name`, `F_FriendGroupID`, `createdAt`, `updatedAt`)
VALUES
	(1,2,1,'上帝备注',1,NULL,NULL),
	(2,3,1,'我自己',2,NULL,NULL),
	(3,4,1,'猴子备注',3,NULL,NULL),
	(4,5,1,'鸭子备注',3,NULL,NULL),
	(5,6,1,'狗子备注',3,NULL,NULL),
	(6,7,1,'猫子备注',4,NULL,NULL),
	(7,8,1,'猪子备注',4,NULL,NULL),
	(8,9,1,'龙子备注',4,NULL,NULL),
	(9,10,1,'羊子备注',4,NULL,NULL),
	(10,3,2,NULL,1,NULL,NULL);

/*!40000 ALTER TABLE `Friend` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Friend_Group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Friend_Group`;

CREATE TABLE `Friend_Group` (
  `FG_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `FG_Name` varchar(20) NOT NULL DEFAULT '' COMMENT '好友分组名',
  `FG_UserID` int(11) unsigned NOT NULL COMMENT '用户ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`FG_ID`),
  KEY `FG_UserID` (`FG_UserID`),
  CONSTRAINT `friend_group_ibfk_1` FOREIGN KEY (`FG_UserID`) REFERENCES `user` (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='好友分组表';

LOCK TABLES `Friend_Group` WRITE;
/*!40000 ALTER TABLE `Friend_Group` DISABLE KEYS */;

INSERT INTO `Friend_Group` (`FG_ID`, `FG_Name`, `FG_UserID`, `createdAt`, `updatedAt`)
VALUES
	(1,'好友',1,NULL,NULL),
	(2,'家人',1,NULL,NULL),
	(3,'愁人',1,NULL,NULL),
	(4,'没人',1,NULL,NULL),
	(5,'好友',2,NULL,NULL);

/*!40000 ALTER TABLE `Friend_Group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Message
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Message`;

CREATE TABLE `Message` (
  `M_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `M_FromUserID` int(11) unsigned NOT NULL COMMENT '发送者ID',
  `M_ToUserID` int(11) unsigned NOT NULL COMMENT '接收者ID',
  `M_Content` text NOT NULL COMMENT '消息内容',
  `M_Expires` datetime DEFAULT NULL COMMENT '消息到期时间',
  `M_Status` enum('发送中','发送成功','发送失败') NOT NULL DEFAULT '发送成功' COMMENT '发送状态',
  `M_MessageTypeID` int(11) unsigned NOT NULL DEFAULT '1' COMMENT '消息类型ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`M_ID`),
  KEY `M_FromUserID` (`M_FromUserID`),
  KEY `M_ToUserID` (`M_ToUserID`),
  KEY `M_MessageTypeID` (`M_MessageTypeID`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`M_FromUserID`) REFERENCES `User` (`U_ID`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`M_ToUserID`) REFERENCES `User` (`U_ID`),
  CONSTRAINT `message_ibfk_3` FOREIGN KEY (`M_MessageTypeID`) REFERENCES `Message_Type` (`MT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='消息记录表';

LOCK TABLES `Message` WRITE;
/*!40000 ALTER TABLE `Message` DISABLE KEYS */;

INSERT INTO `Message` (`M_ID`, `M_FromUserID`, `M_ToUserID`, `M_Content`, `M_Expires`, `M_Status`, `M_MessageTypeID`, `createdAt`, `updatedAt`)
VALUES
	(1,1,2,'我是1号员工，我是liupei，我在联系上帝',NULL,'发送成功',1,NULL,NULL),
	(2,2,1,'我是上帝，我收到了liupei的来信，我要祝福他',NULL,'发送成功',1,NULL,NULL),
	(3,1,2,'谢谢上帝的祝福',NULL,'发送成功',1,NULL,NULL),
	(4,3,1,'Hello,主人',NULL,'发送成功',1,NULL,NULL),
	(5,3,4,'你就是猴子吧',NULL,'发送成功',1,NULL,NULL);

/*!40000 ALTER TABLE `Message` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Message_Type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Message_Type`;

CREATE TABLE `Message_Type` (
  `MT_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `MT_Name` varchar(20) NOT NULL DEFAULT '' COMMENT '消息类型名',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`MT_ID`),
  UNIQUE KEY `MT_Name` (`MT_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='消息类型表';

LOCK TABLES `Message_Type` WRITE;
/*!40000 ALTER TABLE `Message_Type` DISABLE KEYS */;

INSERT INTO `Message_Type` (`MT_ID`, `MT_Name`, `createdAt`, `updatedAt`)
VALUES
	(1,'文本',NULL,NULL),
	(2,'图片',NULL,NULL),
	(3,'语音',NULL,NULL);

/*!40000 ALTER TABLE `Message_Type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `U_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `U_UserID` varchar(20) NOT NULL DEFAULT '' COMMENT '用户ID',
  `U_NickName` varchar(20) NOT NULL DEFAULT '' COMMENT '昵称',
  `U_Password` varchar(20) NOT NULL DEFAULT '' COMMENT '密码',
  `U_SingaTure` varchar(150) NOT NULL DEFAULT '这个人太懒了，什么都没有留下~' COMMENT '个性签名',
  `U_Sex` enum('男','女','未知') NOT NULL DEFAULT '未知' COMMENT '性别',
  `U_Birthday` datetime DEFAULT NULL COMMENT '生日',
  `U_Email` varchar(20) NOT NULL DEFAULT '' COMMENT '邮箱',
  `U_HeadPortrait` varchar(100) NOT NULL DEFAULT '' COMMENT '头像',
  `U_UserStateID` int(11) unsigned NOT NULL DEFAULT '1' COMMENT '用户状态ID',
  `U_FriendPolicyID` int(11) unsigned NOT NULL DEFAULT '1' COMMENT '好友策略ID',
  `U_FriendPolicyQuestion` varchar(30) DEFAULT NULL COMMENT '好友策略问题',
  `U_FriendPolicyAnswer` varchar(30) DEFAULT NULL COMMENT '好友策略答案',
  `U_FriendPolicyPassword` varchar(20) DEFAULT NULL COMMENT '好友策略密码',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`U_ID`),
  UNIQUE KEY `U_UserID` (`U_UserID`),
  KEY `U_UserStateID` (`U_UserStateID`),
  KEY `U_FriendPolicyID` (`U_FriendPolicyID`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`U_UserStateID`) REFERENCES `User_State` (`US_ID`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`U_FriendPolicyID`) REFERENCES `User_FriendPolicy` (`UFP_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;

INSERT INTO `User` (`U_ID`, `U_UserID`, `U_NickName`, `U_Password`, `U_SingaTure`, `U_Sex`, `U_Birthday`, `U_Email`, `U_HeadPortrait`, `U_UserStateID`, `U_FriendPolicyID`, `U_FriendPolicyQuestion`, `U_FriendPolicyAnswer`, `U_FriendPolicyPassword`, `createdAt`, `updatedAt`)
VALUES
	(1,'liupei','腻害~','12345678','这个人太懒了，没有留下任何东西~','男','1997-01-27 00:00:00','2771873200@qq.com','123',1,1,'我心里在想什么','什么也没想','wuchat',NULL,NULL),
	(2,'shangdi','上帝是个girl','12345678','这个人太懒了，没有留下任何东西~','女','1900-01-01 00:00:00','1154844402@qq.com','123',2,2,'我心里在想什么','什么都没想','wuchat',NULL,NULL),
	(3,'liupei05','美团小伙子','12345678','这个人太懒了，没有留下任何东西~','未知','2017-10-01 00:00:00','liupei05@meituan.com','123',4,3,'我心里在想什么','什么都没想','wuchat',NULL,NULL),
	(4,'monkey','猴子昵称','12345678','这个人太懒了，没有留下任何东西~','未知','2018-04-27 00:00:00','2771873200@qq.com','123',1,1,NULL,NULL,NULL,NULL,NULL),
	(5,'duck','鸭子昵称','12345678','这个人太懒了，没有留下任何东西~','未知','2018-04-27 00:00:00','2771873200@qq.com','123',1,1,NULL,NULL,NULL,NULL,NULL),
	(6,'dog','狗子昵称','12345678','这个人太懒了，没有留下任何东西~','未知','2018-04-27 00:00:00','2771873200@qq.com','123',1,1,NULL,NULL,NULL,NULL,NULL),
	(7,'cat','猫子昵称','12345678','这个人太懒了，没有留下任何东西~','未知','2018-04-27 00:00:00','2771873200@qq.com','123',1,1,NULL,NULL,NULL,NULL,NULL),
	(8,'pig','猪子昵称','12345678','这个人太懒了，没有留下任何东西~','未知','2018-04-27 00:00:00','2771873200@qq.com','123',1,1,NULL,NULL,NULL,NULL,NULL),
	(9,'dragon','龙子昵称','12345678','这个人太懒了，没有留下任何东西~','未知','2018-04-27 00:00:00','2771873200@qq.com','123',1,1,NULL,NULL,NULL,NULL,NULL),
	(10,'sheep','羊子昵称','12345678','这个人太懒了，没有留下任何东西~','未知','2018-04-27 00:00:00','2771873200@qq.com','123',1,1,NULL,NULL,NULL,NULL,NULL),
	(24,'huoying','火影忍者','12345678','这个人太懒了，什么都没有留下~','未知',NULL,'2771873200@qq.com','123',1,1,NULL,NULL,NULL,'2018-04-28 06:09:13','2018-04-28 06:09:13');

/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User_FriendPolicy
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User_FriendPolicy`;

CREATE TABLE `User_FriendPolicy` (
  `UFP_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UFP_Type` varchar(20) NOT NULL DEFAULT '' COMMENT '好友添加方式',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`UFP_ID`),
  UNIQUE KEY `UFP_Type` (`UFP_Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户好友策略表';

LOCK TABLES `User_FriendPolicy` WRITE;
/*!40000 ALTER TABLE `User_FriendPolicy` DISABLE KEYS */;

INSERT INTO `User_FriendPolicy` (`UFP_ID`, `UFP_Type`, `createdAt`, `updatedAt`)
VALUES
	(1,'直接通过',NULL,NULL),
	(2,'需要通过验证问题',NULL,NULL),
	(3,'需要通过验证密码',NULL,NULL),
	(4,'不允许添加好友',NULL,NULL);

/*!40000 ALTER TABLE `User_FriendPolicy` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User_Group
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User_Group`;

CREATE TABLE `User_Group` (
  `UG_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UG_Name` varchar(20) NOT NULL DEFAULT '' COMMENT '群昵称',
  `UG_AdminID` int(11) unsigned NOT NULL COMMENT '群主ID',
  `UG_Icon` varchar(100) NOT NULL DEFAULT '' COMMENT '群图标',
  `UG_Notice` varchar(150) DEFAULT '' COMMENT '群公告',
  `UG_Intro` varchar(150) DEFAULT '' COMMENT '群简介',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`UG_ID`),
  UNIQUE KEY `UG_ID` (`UG_ID`),
  KEY `UG_AdminID` (`UG_AdminID`),
  CONSTRAINT `user_group_ibfk_1` FOREIGN KEY (`UG_AdminID`) REFERENCES `User` (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户群组表';

LOCK TABLES `User_Group` WRITE;
/*!40000 ALTER TABLE `User_Group` DISABLE KEYS */;

INSERT INTO `User_Group` (`UG_ID`, `UG_Name`, `UG_AdminID`, `UG_Icon`, `UG_Notice`, `UG_Intro`, `createdAt`, `updatedAt`)
VALUES
	(1,'WuChat第一个群',1,'123','群公告，大家看一下！！！','这是WuChat第一个群，大家在里面好好相处文明说话...',NULL,NULL),
	(2,'火影忍者',2,'qwe','公告','介绍',NULL,NULL);

/*!40000 ALTER TABLE `User_Group` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User_GroupMessage
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User_GroupMessage`;

CREATE TABLE `User_GroupMessage` (
  `UGM_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UGM_UserGroupID` int(11) unsigned NOT NULL DEFAULT '1' COMMENT '群ID',
  `UGM_FromUserID` int(11) unsigned NOT NULL COMMENT '发送者ID',
  `UGM_Content` text NOT NULL COMMENT '消息内容',
  `UGM_Expries` datetime DEFAULT NULL COMMENT '消息到期时间',
  `UGM_Status` enum('发送中','发送成功','发送失败') NOT NULL DEFAULT '发送成功' COMMENT '发送状态',
  `UGM_MessageTypeID` int(11) unsigned NOT NULL DEFAULT '1' COMMENT '消息类型ID',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`UGM_ID`),
  KEY `UGM_FromUserID` (`UGM_FromUserID`),
  KEY `UGM_UserGroupID` (`UGM_UserGroupID`),
  KEY `UGM_MessageTypeID` (`UGM_MessageTypeID`),
  CONSTRAINT `user_groupmessage_ibfk_1` FOREIGN KEY (`UGM_FromUserID`) REFERENCES `User` (`U_ID`),
  CONSTRAINT `user_groupmessage_ibfk_2` FOREIGN KEY (`UGM_UserGroupID`) REFERENCES `User_Group` (`UG_ID`),
  CONSTRAINT `user_groupmessage_ibfk_3` FOREIGN KEY (`UGM_MessageTypeID`) REFERENCES `Message_Type` (`MT_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户群组消息记录表';

LOCK TABLES `User_GroupMessage` WRITE;
/*!40000 ALTER TABLE `User_GroupMessage` DISABLE KEYS */;

INSERT INTO `User_GroupMessage` (`UGM_ID`, `UGM_UserGroupID`, `UGM_FromUserID`, `UGM_Content`, `UGM_Expries`, `UGM_Status`, `UGM_MessageTypeID`, `createdAt`, `updatedAt`)
VALUES
	(1,1,1,'我在群里说话了',NULL,'发送成功',1,NULL,NULL),
	(2,1,2,'我们看到你说话了',NULL,'发送成功',1,NULL,NULL),
	(3,1,3,'是啊，你是第一个说话的人',NULL,'发送成功',1,NULL,NULL),
	(4,2,2,'我是群主！！！',NULL,'发送成功',1,NULL,NULL);

/*!40000 ALTER TABLE `User_GroupMessage` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table User_State
# ------------------------------------------------------------

DROP TABLE IF EXISTS `User_State`;

CREATE TABLE `User_State` (
  `US_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `US_Name` varchar(20) NOT NULL DEFAULT '' COMMENT '状态名',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`US_ID`),
  UNIQUE KEY `US_Name` (`US_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户状态表';

LOCK TABLES `User_State` WRITE;
/*!40000 ALTER TABLE `User_State` DISABLE KEYS */;

INSERT INTO `User_State` (`US_ID`, `US_Name`, `createdAt`, `updatedAt`)
VALUES
	(1,'在线',NULL,NULL),
	(2,'隐身',NULL,NULL),
	(3,'离线',NULL,NULL),
	(4,'忙碌',NULL,NULL);

/*!40000 ALTER TABLE `User_State` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
