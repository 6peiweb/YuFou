# 与否App


## 简介
> 本项目是一个关于即时通讯的Webapp，也是LZ18年的毕业设计。源代码(only exclude node_modules)包括**前端UI**、**前端逻辑**、**后端接口**、**数据库设计**、**webpack配置(模块处理、热加载)**、**热部署**，全由LZ一行一行敲出来的，如有疑问或赐教请联系QQ2771873200。

> [更新历史](https://github.com/6peiweb/YuFou/blob/master/CHANGELOG.md)

## Build Setup

``` bash
# basic dependencies
首先你需要安装node、npm、Mysql

# import mysql tables
CREATE DATABASE WuChat;
USE WuChat;
SOURCE ./server/sequelize/sql/WuChat_2018-04-27.sql;

# install module dependencies
npm install

# serve with hot reload at 127.0.0.1:4000
npm start

```
