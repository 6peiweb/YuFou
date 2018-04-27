# WuChat

> 本来是为了想撸一个毕业设计关于聊天的Webapp，最后撸上瘾了，甚至想撸出一个开源项目...

## Build Setup

``` bash
# basic dependencies
首先你需要安装node、npm、Mysql

# import mysql tables
CREATE DATABASE WuChat;
USE WuChat;
SOURCE ./server/sequelize/sql/WuChat.sql;

# install module dependencies
npm install

# serve with hot reload at 127.0.0.1:4000
npm start

```