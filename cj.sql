/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : cj

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-06-16 15:13:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept` (
  `DEPTNO` decimal(4,0) DEFAULT NULL,
  `DNAME` varchar(14) DEFAULT NULL,
  `LOC` varchar(13) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('10', 'ACCOUNTING', 'NEW YORK');
INSERT INTO `dept` VALUES ('20', 'RESEARCH', 'DALLAS');
INSERT INTO `dept` VALUES ('30', 'SALES', 'CHICAGO');
INSERT INTO `dept` VALUES ('40', 'OPERATIONS', 'BOSTON');

-- ----------------------------
-- Table structure for emp
-- ----------------------------
DROP TABLE IF EXISTS `emp`;
CREATE TABLE `emp` (
  `EMPNO` decimal(4,0) NOT NULL,
  `ENAME` varchar(10) DEFAULT NULL,
  `JOB` varchar(9) DEFAULT NULL,
  `MGR` decimal(4,0) DEFAULT NULL,
  `HIREDATE` date DEFAULT NULL,
  `SAL` decimal(7,2) DEFAULT NULL,
  `COMM` decimal(7,2) DEFAULT NULL,
  `DEPNO` decimal(4,0) DEFAULT NULL,
  PRIMARY KEY (`EMPNO`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of emp
-- ----------------------------
INSERT INTO `emp` VALUES ('7369', 'SMITH', 'CLERK', '7902', '1980-12-17', '800.00', null, '20');
INSERT INTO `emp` VALUES ('7499', 'ALLEN', 'SALESMAN', '7698', '1981-02-20', '1600.00', '300.00', '30');
INSERT INTO `emp` VALUES ('7521', 'WARD', 'SALESMAN', '7698', '1981-02-22', '1250.00', '500.00', '30');
INSERT INTO `emp` VALUES ('7566', 'JONES', 'MANAGER', '7839', '1981-04-02', '2975.00', null, '20');
INSERT INTO `emp` VALUES ('7654', 'MARTIN', 'SALESMAN', '7698', '1981-09-28', '1250.00', '1400.00', '30');
INSERT INTO `emp` VALUES ('7698', 'BLAKE', 'MANAGER', '7839', '1981-05-01', '2850.00', null, '30');
INSERT INTO `emp` VALUES ('7782', 'CLARK', 'MANAGER', '7839', '1981-06-09', '2450.00', null, '10');
INSERT INTO `emp` VALUES ('7839', 'KING', 'PRESIDENT', null, '1981-11-17', '5000.00', null, '10');
INSERT INTO `emp` VALUES ('7844', 'TURNER', 'SALESMAN', '7698', '1981-09-08', '1500.00', '0.00', '30');
INSERT INTO `emp` VALUES ('7900', 'JAMES', 'CLERK', '7698', '1981-12-03', '950.00', null, '30');
INSERT INTO `emp` VALUES ('7902', 'FORD', 'ANALYST', '7566', '1981-12-03', '3000.00', null, '20');
INSERT INTO `emp` VALUES ('7934', 'MILLER', 'CLERK', '7782', '1982-01-23', '1300.00', null, '10');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `color` varchar(10) DEFAULT NULL,
  `reg_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '商品1', '998', '白色', '2017-06-07 20:32:44');
INSERT INTO `goods` VALUES ('2', '商品1', '998', '白色', '2017-06-07 20:32:44');
INSERT INTO `goods` VALUES ('3', '商品2', '98', '金色', '2017-06-07 20:32:44');
INSERT INTO `goods` VALUES ('4', '商品2', '98', '金色', '2017-06-07 20:32:44');
INSERT INTO `goods` VALUES ('5', '商品2', '98', '金色', '2017-06-07 20:32:44');
INSERT INTO `goods` VALUES ('6', '商品2', '98', '金色', '2017-06-07 20:32:44');
INSERT INTO `goods` VALUES ('7', '商品2', '98', '金色', '2017-06-07 20:32:44');
INSERT INTO `goods` VALUES ('8', '商品3', '968', '金色', '2017-06-07 20:37:06');

-- ----------------------------
-- Table structure for goodslist
-- ----------------------------
DROP TABLE IF EXISTS `goodslist`;
CREATE TABLE `goodslist` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist
-- ----------------------------
INSERT INTO `goodslist` VALUES ('2', '商品1', '256', '蓝色', '37', '1.jpg', 'iphone', '2017-06-12 11:57:12');
INSERT INTO `goodslist` VALUES ('3', '商品2', '356', '黑色', '42', '2.jpg', '小米', '2017-06-08 09:26:14');
INSERT INTO `goodslist` VALUES ('4', '商品3', '456', '黑色', '36', '3.jpg', '华为', '2017-06-08 09:26:20');
INSERT INTO `goodslist` VALUES ('5', '商品4', '114', '红色', '38', '5.jpg', '中兴', '2017-06-08 09:26:24');
INSERT INTO `goodslist` VALUES ('6', '商品5', '344', '金色', '41', '76.jpg', '诺基亚', '2017-06-08 09:26:30');
INSERT INTO `goodslist` VALUES ('7', '商品6', '421', '绿色', '39', '56.jpg', '努比亚', '2017-06-08 09:26:48');
INSERT INTO `goodslist` VALUES ('8', '商品7', '431', '棕色', '42', '8.jpg', 'htc', '2017-06-08 09:26:50');
INSERT INTO `goodslist` VALUES ('9', '商品8', '143', '白色', '38', '9.jpg', '三星', '2017-06-08 09:26:55');
INSERT INTO `goodslist` VALUES ('10', '商品9', '542', '红色', '42', '11.jpg', '黑莓', '2017-06-08 09:27:03');
INSERT INTO `goodslist` VALUES ('11', '商品10', '664', '黄色', '37', '12.jpg', 'vivo', '2017-06-08 09:27:12');
INSERT INTO `goodslist` VALUES ('12', '商品11', '653', '灰色', '39', '23.jpg', 'oppo', '2017-06-08 09:27:16');
INSERT INTO `goodslist` VALUES ('13', '商品12', '246', '绿色', '44', '22.jpg', 'Lenovo', '2017-06-08 09:27:30');
INSERT INTO `goodslist` VALUES ('14', '商品13', '668', '粉色', '36', '33.jpg', '摩托罗拉', '2017-06-08 09:29:11');
INSERT INTO `goodslist` VALUES ('15', '商品14', '998', '紫色', '40', '66.jpg', '金立', '2017-06-08 09:49:01');

-- ----------------------------
-- Table structure for goodslist1
-- ----------------------------
DROP TABLE IF EXISTS `goodslist1`;
CREATE TABLE `goodslist1` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `del_price` decimal(10,0) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodslist1
-- ----------------------------
INSERT INTO `goodslist1` VALUES ('1', '耐克Nike', '368', '499', '黑', '42', 'css/img/goodslist01.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('2', '李宁', '379', '528', '黑', '43', 'css/img/goodslist02.jpg', '男鞋', '2017-06-12 16:47:00');
INSERT INTO `goodslist1` VALUES ('3', '耐克Nike', '468', '666', '黑', '40', 'css/img/goodslist03.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('4', '耐克Nike', '379', '499', '白', '38', 'css/img/goodslist04.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('5', '乔丹', '368', '499', '黑', '43', 'css/img/goodslist05.jpg', '女鞋', '2017-06-12 16:48:16');
INSERT INTO `goodslist1` VALUES ('6', '安踏', '379', '499', '黑', '36', 'css/img/goodslist06.jpg', '男鞋', '2017-06-12 16:45:41');
INSERT INTO `goodslist1` VALUES ('7', '耐克Nike', '468', '499', '深蓝', '37', 'css/img/goodslist07.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('8', '阿迪达斯', '379', '499', '黑', '42', 'css/img/goodslist08.jpg', '男鞋', '2017-06-12 16:45:11');
INSERT INTO `goodslist1` VALUES ('9', '耐克Nike', '428', '666', '深蓝', '39', 'css/img/goodslist09.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('10', '乔丹', '379', '499', '白', '42', 'css/img/goodslist10.jpg', '男鞋', '2017-06-12 16:47:34');
INSERT INTO `goodslist1` VALUES ('11', '耐克Nike', '468', '528', '黑', '41', 'css/img/goodslist11.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('12', '安踏', '379', '499', '黑', '42', 'css/img/goodslist12.jpg', '男鞋', '2017-06-12 16:45:37');
INSERT INTO `goodslist1` VALUES ('13', '耐克Nike', '428', '499', '黑', '43', 'css/img/goodslist13.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('14', '耐克Nike', '468', '499', '黑', '45', 'css/img/goodslist14.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('15', '李宁', '428', '499', '黑', '42', 'css/img/goodslist15.jpg', '女鞋', '2017-06-12 16:48:17');
INSERT INTO `goodslist1` VALUES ('16', '耐克Nike', '379', '666', '深蓝', '37', 'css/img/goodslist16.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('17', '耐克Nike', '379', '499', '白', '38', 'css/img/goodslist17.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('18', '耐克Nike', '468', '499', '黑', '39', 'css/img/goodslist18.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('19', '阿迪达斯', '379', '528', '黑', '42', 'css/img/goodslist19.jpg', '男鞋', '2017-06-12 16:47:02');
INSERT INTO `goodslist1` VALUES ('20', '耐克Nike', '379', '499', '黑', '42', 'css/img/goodslist20.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('21', '李宁', '368', '666', '白', '42', 'css/img/goodslist21.jpg', '男鞋', '2017-06-12 16:47:35');
INSERT INTO `goodslist1` VALUES ('22', '耐克Nike', '379', '499', '黑', '42', 'css/img/goodslist22.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('23', '乔丹', '428', '666', '深蓝', '36', 'css/img/goodslist23.jpg', '男鞋', '2017-06-13 22:10:44');
INSERT INTO `goodslist1` VALUES ('24', '耐克Nike', '379', '499', '黑', '42', 'css/img/goodslist24.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('25', '耐克Nike', '379', '499', '黑', '36', 'css/img/goodslist25.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('26', '阿迪达斯', '428', '528', '黑', '42', 'css/img/goodslist26.jpg', '女鞋', '2017-06-12 16:48:18');
INSERT INTO `goodslist1` VALUES ('27', '耐克Nike', '379', '499', '黑', '42', 'css/img/goodslist27.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('28', '耐克Nike', '379', '666', '黑', '36', 'css/img/goodslist28.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('29', '李宁', '379', '499', '白', '42', 'css/img/goodslist29.jpg', '女鞋', '2017-06-12 16:48:18');
INSERT INTO `goodslist1` VALUES ('30', '耐克Nike', '379', '499', '黑', '42', 'css/img/goodslist30.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('31', '阿迪达斯', '379', '528', '深蓝', '36', 'css/img/goodslist31.jpg', '女鞋', '2017-06-13 22:10:46');
INSERT INTO `goodslist1` VALUES ('32', '耐克Nike', '379', '499', '黑', '42', 'css/img/goodslist32.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('33', '耐克Nike', '428', '499', '白', '36', 'css/img/goodslist33.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('34', '耐克Nike', '379', '499', '黑', '36', 'css/img/goodslist34.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('35', '阿迪达斯', '368', '528', '黑', '36', 'css/img/goodslist35.jpg', '男鞋', '2017-06-13 22:10:47');
INSERT INTO `goodslist1` VALUES ('36', '乔丹', '468', '666', '黑', '42', 'css/img/goodslist36.jpg', '女鞋', '2017-06-13 22:10:12');
INSERT INTO `goodslist1` VALUES ('37', '阿迪达斯', '468', '499', '白', '36', 'css/img/goodslist37.jpg', '男鞋', '2017-06-13 22:10:47');
INSERT INTO `goodslist1` VALUES ('38', '耐克Nike', '468', '688', '黑', '36', 'css/img/goodslist38.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('39', '耐克Nike', '468', '528', '黑', '37', 'css/img/goodslist39.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('40', '耐克Nike', '379', '499', '深蓝', '36', 'css/img/goodslist40.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('41', '乔丹', '468', '499', '黑', '36', 'css/img/goodslist41.jpg', '男鞋', '2017-06-13 22:10:59');
INSERT INTO `goodslist1` VALUES ('42', '耐克Nike', '379', '499', '白', '38', 'css/img/goodslist42.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('43', '阿迪达斯', '379', '528', '黑', '36', 'css/img/goodslist43.jpg', '男鞋', '2017-06-13 22:10:48');
INSERT INTO `goodslist1` VALUES ('44', '乔丹', '368', '499', '黑', '38', 'css/img/goodslist44.jpg', '男鞋', '2017-06-13 22:11:18');
INSERT INTO `goodslist1` VALUES ('45', '耐克Nike', '468', '499', '深蓝', '36', 'css/img/goodslist45.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('46', '安踏', '379', '666', '白', '38', 'css/img/goodslist46.jpg', '女鞋', '2017-06-13 22:11:25');
INSERT INTO `goodslist1` VALUES ('47', '耐克Nike', '468', '499', '黑', '42', 'css/img/goodslist47.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('48', '耐克Nike', '379', '499', '黑', '36', 'css/img/goodslist48.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('49', '耐克Nike', '428', '499', '黑', '36', 'css/img/goodslist49.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('50', '安踏', '379', '499', '白', '42', 'css/img/goodslist50.jpg', '男鞋', '2017-06-12 16:47:37');
INSERT INTO `goodslist1` VALUES ('51', '耐克Nike', '468', '499', '黑', '42', 'css/img/goodslist11.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('52', '耐克Nike', '368', '499', '深蓝', '42', 'css/img/goodslist12.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('53', '耐克Nike', '379', '499', '黑', '36', 'css/img/goodslist13.jpg', '女鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('54', '耐克Nike', '379', '499', '黑', '42', 'css/img/goodslist14.jpg', '男鞋', '2017-06-14 09:31:45');
INSERT INTO `goodslist1` VALUES ('55', '安踏', '368', '499', '白', '36', 'css/img/goodslist15.jpg', '女鞋', '2017-06-13 22:10:51');
INSERT INTO `goodslist1` VALUES ('56', '美国乔丹', '598', '679', '青绿', '42', 'css/img/goodsDetail001m.jpg', '男鞋', '2017-06-14 14:44:04');

-- ----------------------------
-- Table structure for salgrade
-- ----------------------------
DROP TABLE IF EXISTS `salgrade`;
CREATE TABLE `salgrade` (
  `GRADE` decimal(10,0) DEFAULT NULL,
  `LOSAL` decimal(10,0) DEFAULT NULL,
  `HISAL` decimal(10,0) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of salgrade
-- ----------------------------
INSERT INTO `salgrade` VALUES ('1', '700', '1200');
INSERT INTO `salgrade` VALUES ('2', '1201', '1400');
INSERT INTO `salgrade` VALUES ('3', '1401', '2000');
INSERT INTO `salgrade` VALUES ('4', '2001', '3000');
INSERT INTO `salgrade` VALUES ('5', '3001', '9999');

-- ----------------------------
-- Table structure for usermsg
-- ----------------------------
DROP TABLE IF EXISTS `usermsg`;
CREATE TABLE `usermsg` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usermsg
-- ----------------------------
INSERT INTO `usermsg` VALUES ('27', 'wangxiong', '79d886010186eb60e3611cd4a5d0bcae');
INSERT INTO `usermsg` VALUES ('13', 'wuqian', 'bcbe3365e6ac95ea2c0343a2395834dd');
INSERT INTO `usermsg` VALUES ('26', 'ytdytdk', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `usermsg` VALUES ('25', 'wuqian222', '96e79218965eb72c92a549dd5a330112');
INSERT INTO `usermsg` VALUES ('18', 'tangqiuping', 'b01b27257f4e9d3f4ca6af1bcd0280f5');
INSERT INTO `usermsg` VALUES ('23', 'wuqian123', 'e10adc3949ba59abbe56e057f20f883e');
INSERT INTO `usermsg` VALUES ('21', 'fudauifluaaf', '96e79218965eb72c92a549dd5a330112');
INSERT INTO `usermsg` VALUES ('22', '1111111', '96e79218965eb72c92a549dd5a330112');
INSERT INTO `usermsg` VALUES ('28', 'wanxiong', 'e3ceb5881a0a1fdaad01296d7554868d');
INSERT INTO `usermsg` VALUES ('30', 'e354e6', 'e11170b8cbd2d74102651cb967fa28e5');
INSERT INTO `usermsg` VALUES ('31', 'dgAQHFDJAD', 'e10adc3949ba59abbe56e057f20f883e');
