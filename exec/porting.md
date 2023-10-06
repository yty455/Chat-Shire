# 포팅 매뉴얼

### 1. 개요

- ##### 프로젝트 사용 도구
  
  - 이슈관리 : JIRA
  
  - 형상관리 : Gitlab
  
  - 커뮤니케이션 : Notion, Mattermost
  
  - 디자인 : Figma
  
  - UCC : 모바비
- ##### 개발환경
  
  - React : ^18.2.0
  
  - Vite : ^4.4.5
  
  - react-router-dom : ^6.15.0
  
  - recoil : ^0.7.7
  
  - axios : ^1.5.0
  
  - VS Code : 1.18.1
  
  - IntelliJ : 11.0.19
  
  - Springboot : 2.7.13
  
  - Lombok
  
  - Spring Data JPA
  
  - Spring Data Redis(lecttuce)
  
  - Spring Web
  
  - Springdoc-openapi-ui 1.6.11
  
  - Oauth2
  
  - Swagger 3.0.0
  
  - Node.js : 18.16.1
  
  - SERVER : AWS EC2 Ubuntu 20.04.6 LTS

  - Hadoop : 3.3.5

  - Spark : 3.4.1
  
  - DB : MySQL 8.0.33, Redis

- ##### 외부 서비스
  
  - GitHub OAuth2 : application-oauth.yml에 설정
  
  - AWS S3 : .env에 설정

- ##### git ignore
  
  - React-Vite : .env
  
  - Spring : application-jwt.yml, application-local.yml, application-prod.yml, application-oauth.yml(\src\main\resources에 위치)

## 2. 빌드

- ##### 환경변수 형태
  
  - .env
    
    ```
    - REACT_APP_REGION=<S3 REGION>
    - REACT_APP_ACCESS_KEY_ID=<S3 ACCESS_KEY_ID>
    - REACT_APP_SECRET_ACCESS_KEY=<S3 SECRET_ACCESS_KEY>
    ```
  
  - application-local.yml
    
    ```
    spring:
      datasource:
        url: <MySQL DB 주소>
        username: <유저 이름>
        password: <유저 비밀번호>
        driver-class-name: com.mysql.cj.jdbc.Driver
    
      jpa:
        hibernate:
          ddl-auto: create
        properties:
          hibernate:
            show_sql: true
            format_sql: true
    
    ```
  
  - application-prod.yml
    
    ```

    spring:
      datasource:
        url: <MySQL DB 주소>
        username: <유저 이름>
        password: <유저 비밀번호>
        driver-class-name: com.mysql.cj.jdbc.Driver
    
      jpa:
        hibernate:
          ddl-auto: validate
        properties:
          hibernate:
            show_sql: true
            format_sql: true
      redis:
        host: <host ip 주소>
        port: <사용할 포트 번호>
        password: <redis 비밀번호>
    
    ```
  
  - application-oauth.yml
    
    ```
    spring:
        security:
            oauth2:
                client:
                    registration:
                        github:
                            client-id: <GitHub OAuth application Client ID>
                            client-secret: <GitHub OAuth application Client secrets>
                            scope:
                                - user
                                - user.email

    redirect:
        host: <서비스 URL>

    ```
  
  - application-jwt.yml
    
    ```
    jwt:
      secretKey: <설정하고자 하는 JWT secretKey>
    
      access:
        expiration: 1800000 # 30분
        header: Authorization
    
      refresh:
        expiration: 1209600000 # 2주
        header: Authorization_refresh
    ```
- ##### Hadoop 설정
  ```
    sudo apt update
    sudo apt install openjdk-11-jdk

    wget https://downloads.apache.org/hadoop/common/hadoop-3.3.5/hadoop-3.3.5.tar.gz
    tar xvf hadoop-3.3.5.tar.gz
    sudo mv hadoop-3.3.5 /usr/local/hadoop

    nano ~/.bashrc
    export HADOOP_HOME=/usr/local/hadoop
    export PATH=$PATH:$HADOOP_HOME/bin
    export PATH=$PATH:$HADOOP_HOME/sbin
    export HADOOP_HDFS_HOME=$HADOOP_HOME
    export YARN_HOME=$HADOOP_HOME
    source ~/.bashrc

    hdfs namenode -format
    start-dfs.sh
  ```
- ##### Spark 설정
  ```
    sudo apt install scala
    wget https://downloads.apache.org/spark/spark-3.4.1/spark-3.4.1-bin-hadoop3.tgz
    tar xvf spark-3.4.1-bin-hadoop3.tgz
    sudo mv spark-3.4.1-bin-hadoop3 /usr/local/spark

    nano ~/.bashrc
    export SPARK_HOME=/usr/local/spark
    export PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin
    export PYSPARK_PYTHON=/usr/bin/python3
    source ~/.bashrc
  ```

- ##### Spark 스크립트
  ```
  from pyspark.context import SparkContext
  from pyspark.sql.session import SparkSession
  from pyspark.sql.functions import explode
  from pyspark.sql.functions import col
  from pyspark.sql import Row
  from pyspark.sql.types import StructType, StructField, IntegerType, ArrayType, StringType
  from pyspark.sql import DataFrameWriter
  import mysql.connector
  import glob
  import datetime
  from datetime import datetime, timedelta
  import os
  import shutil
  import time

  sc = SparkContext('local')
  spark = SparkSession(sc)

  now = datetime.now()
  one_hour_ago = now + timedelta(hours=8)
  date_str = one_hour_ago.strftime("%Y-%m-%d %H")

  two_hour_ago = now + timedelta(hours=7)
  date_str_two = two_hour_ago.strftime("%Y-%m-%d %H")

  folder = '/home/ubuntu/input/'+ date_str_two

  if os.path.exists(folder) and os.path.isdir(folder):
      shutil.rmtree(folder)
      
  schema = StructType([
    StructField("chatroomId", IntegerType(), True),
    StructField("userId", IntegerType(), True),
    StructField("categoryList", ArrayType(StringType()), True)
  ])

  start = time.time()

  df = spark.read.schema(schema).json("/home/ubuntu/input/" + date_str+ "/*.json")
  df = df.withColumnRenamed("chatroomId", "chatroom_id").withColumnRenamed("userId", "user_id")
  df.show()

  df = df.withColumn("category", explode(col("categoryList")))

  df = df.groupBy("chatroom_id", "user_id", "category").count()

  df = df.groupBy("chatroom_id", "user_id").pivot("category").sum("count")

  df.show()

  columns = [c for c in df.columns if c not in ['chatroom_id', 'user_id']]

  rdd = df.rdd.flatMap(lambda x: [Row(chatroom_id=x['chatroom_id'], user_id=x['user_id'], word=c, count=x[c]) for c in columns])

  # rdd = rdd.repartition(5)

  new_df = spark.createDataFrame(rdd)

  new_df = new_df.na.drop(subset=["count"])

  new_df.show()

  end = time.time()

  print(end - start)

  # MySQL > DataFrame 
  url = "주소"
  properties = {
      "driver": "com.mysql.cj.jdbc.Driver",
      "user": "유저명",
      "password": "비밀번호"
  }

  df.write.jdbc(url=url, table="mytable_temp", mode="overwrite", properties=properties)

  # MySQL connection
  cnx = mysql.connector.connect(user='유저명', password='비밀번호', host='URL', database='ssafychat')

  cursor = cnx.cursor()

  # category UPDATE query
  for row in new_df.collect():
      # update
      query_update = f"""
      UPDATE distributed 
      SET count = count + {row['count']}
      WHERE chatroom_id = {row['chatroom_id']} AND user_id = {row['user_id']} AND word = '{row['word']}'
      """
      cursor.execute(query_update)
      
      # insert -> default 0 
      query_insert = f"""
      INSERT INTO distributed (chatroom_id, user_id, word, count)
      SELECT {row['chatroom_id']}, {row['user_id']}, '{row['word']}', {row['count']}
      WHERE NOT EXISTS (SELECT 1 FROM distributed WHERE chatroom_id = {row['chatroom_id']} AND user_id = {row['user_id']} AND word = '{row['word']}')
      """
      cursor.execute(query_insert)

  cnx.commit()
  cursor.close()
  cnx.close()
  ```

- ##### 빌드하기
  
  1. Front: React-Vite
     
     1. npm install
     
     2. npm run build
  
  2. Back: Spring
     
     1. Gradle 실행
  
- 배포하기
  
  1. Nginx 설정
  
  2. 도커
  
  3. MySQL
     
     1. Dump_chat-shire.sql 실행
        
        ```
        
        CREATE DATABASE  IF NOT EXISTS `ssafychat` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
        USE `ssafychat`;
        -- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
        --
        -- Host: j9e205.p.ssafy.io    Database: ssafychat
        -- ------------------------------------------------------
        -- Server version	8.0.33

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
        -- Table structure for table `attached_file`
        --

        DROP TABLE IF EXISTS `attached_file`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `attached_file` (
        `attachedfile_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `category` varchar(255) DEFAULT NULL,
        `chat_number` bigint DEFAULT NULL,
        `chat_room_id` bigint DEFAULT NULL,
        `post_id` bigint DEFAULT NULL,
        `thumbnail` varchar(255) DEFAULT NULL,
        `url` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`attachedfile_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `challenge`
        --

        DROP TABLE IF EXISTS `challenge`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `challenge` (
        `challenge_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `afternoon_commit` bigint NOT NULL,
        `chat` int NOT NULL,
        `commit` bigint NOT NULL,
        `data` int NOT NULL,
        `done` int NOT NULL,
        `error` int NOT NULL,
        `link` int NOT NULL,
        `login` int NOT NULL,
        `morning_commit` bigint NOT NULL,
        `night_commit` bigint NOT NULL,
        `ongoing` int NOT NULL,
        `project` int NOT NULL,
        `snackbar` int NOT NULL,
        `solution` int NOT NULL,
        `task` int NOT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`challenge_id`),
        KEY `FKq8acspc7u4hsl89y9sfq1hq27` (`user_id`),
        CONSTRAINT `FKq8acspc7u4hsl89y9sfq1hq27` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `chat`
        --

        DROP TABLE IF EXISTS `chat`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `chat` (
        `chat_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `chat_number` bigint DEFAULT NULL,
        `chat_time` datetime(6) DEFAULT NULL,
        `content` varchar(500) DEFAULT NULL,
        `is_attached` bit(1) DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`chat_id`),
        KEY `FK4td2hmv9roc3wnj1cg2023sgt` (`chatroom_id`),
        KEY `FK1x766u663l7m0mxuj0o72muu` (`user_id`),
        CONSTRAINT `FK1x766u663l7m0mxuj0o72muu` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
        CONSTRAINT `FK4td2hmv9roc3wnj1cg2023sgt` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `chat_room`
        --

        DROP TABLE IF EXISTS `chat_room`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `chat_room` (
        `chatroom_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `branch` varchar(255) DEFAULT NULL,
        `description` varchar(255) DEFAULT NULL,
        `end_date` date DEFAULT NULL,
        `git_access_token` varchar(255) DEFAULT NULL,
        `git_repository` varchar(255) DEFAULT NULL,
        `name` varchar(255) DEFAULT NULL,
        `start_date` date DEFAULT NULL,
        `team_name` varchar(255) DEFAULT NULL,
        `topic` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `distributed`
        --

        DROP TABLE IF EXISTS `distributed`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `distributed` (
        `distributed_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `count` bigint DEFAULT NULL,
        `word` varchar(255) DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`distributed_id`),
        KEY `FKtphpsxse2gsln97cqg7g98l1p` (`chatroom_id`),
        KEY `FKrwegup5421hf0mxfqom1l3h36` (`user_id`),
        CONSTRAINT `FKrwegup5421hf0mxfqom1l3h36` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
        CONSTRAINT `FKtphpsxse2gsln97cqg7g98l1p` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `keyword`
        --

        DROP TABLE IF EXISTS `keyword`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `keyword` (
        `keyword_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `word` varchar(255) DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        PRIMARY KEY (`keyword_id`),
        KEY `FK3lafgfcre4ngvl4mqofmjj0k8` (`chatroom_id`),
        CONSTRAINT `FK3lafgfcre4ngvl4mqofmjj0k8` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `link`
        --

        DROP TABLE IF EXISTS `link`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `link` (
        `link_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `content` varchar(255) DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        PRIMARY KEY (`link_id`),
        KEY `FK37nto806agmlhr4ehu57g6ukv` (`chatroom_id`),
        CONSTRAINT `FK37nto806agmlhr4ehu57g6ukv` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `mind_map`
        --

        DROP TABLE IF EXISTS `mind_map`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `mind_map` (
        `mindmap_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `content` varchar(255) DEFAULT NULL,
        `node_id` int DEFAULT NULL,
        `parent_id` int DEFAULT NULL,
        `x` double DEFAULT NULL,
        `y` double DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        PRIMARY KEY (`mindmap_id`),
        KEY `FKaql4ca7e6o9aqs431dg5pso7m` (`chatroom_id`),
        CONSTRAINT `FKaql4ca7e6o9aqs431dg5pso7m` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=405 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `my_skill`
        --

        DROP TABLE IF EXISTS `my_skill`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `my_skill` (
        `myskill_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `skill_id` bigint DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`myskill_id`),
        KEY `FKi4c0mflrj13q5i6w5cumt0q8r` (`skill_id`),
        KEY `FK9q85u38qtu0q1qr7q17au0xin` (`user_id`),
        CONSTRAINT `FK9q85u38qtu0q1qr7q17au0xin` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
        CONSTRAINT `FKi4c0mflrj13q5i6w5cumt0q8r` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `mytable_temp`
        --

        DROP TABLE IF EXISTS `mytable_temp`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `mytable_temp` (
        `chatroom_id` int DEFAULT NULL,
        `user_id` int DEFAULT NULL,
        `자동차 및 차량` bigint DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `notice`
        --

        DROP TABLE IF EXISTS `notice`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `notice` (
        `notice_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `content` varchar(255) DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        PRIMARY KEY (`notice_id`),
        KEY `FKqqiwidelav5qkyq3s1sn33c8y` (`chatroom_id`),
        CONSTRAINT `FKqqiwidelav5qkyq3s1sn33c8y` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `notification`
        --

        DROP TABLE IF EXISTS `notification`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `notification` (
        `notification_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `content` varchar(255) NOT NULL,
        `status` int NOT NULL,
        `url` varchar(255) NOT NULL,
        `participation_id` bigint DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`notification_id`),
        KEY `FKgv7s51vohqd3v0nlv6voywxdl` (`participation_id`),
        KEY `FKnk4ftb5am9ubmkv1661h15ds9` (`user_id`),
        CONSTRAINT `FKgv7s51vohqd3v0nlv6voywxdl` FOREIGN KEY (`participation_id`) REFERENCES `participation` (`participation_id`),
        CONSTRAINT `FKnk4ftb5am9ubmkv1661h15ds9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
        ) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `participation`
        --

        DROP TABLE IF EXISTS `participation`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `participation` (
        `participation_id` bigint NOT NULL AUTO_INCREMENT,
        `chatroom_id` bigint DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`participation_id`),
        KEY `FKntt30m767arnppbk10jp693fv` (`chatroom_id`),
        KEY `FKt6kjfjn4ns10i9qhuhwg7s8l` (`user_id`),
        CONSTRAINT `FKntt30m767arnppbk10jp693fv` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`),
        CONSTRAINT `FKt6kjfjn4ns10i9qhuhwg7s8l` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `post`
        --

        DROP TABLE IF EXISTS `post`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `post` (
        `post_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `content` varchar(500) DEFAULT NULL,
        `state` bit(1) DEFAULT NULL,
        `title` varchar(255) DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`post_id`),
        KEY `FK4gp13sy4utofe9bdc4ujrjmew` (`chatroom_id`),
        KEY `FK7ky67sgi7k0ayf22652f7763r` (`user_id`),
        CONSTRAINT `FK4gp13sy4utofe9bdc4ujrjmew` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`),
        CONSTRAINT `FK7ky67sgi7k0ayf22652f7763r` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `post_skill`
        --

        DROP TABLE IF EXISTS `post_skill`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `post_skill` (
        `postskill_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `post_id` bigint DEFAULT NULL,
        `skill_id` bigint DEFAULT NULL,
        PRIMARY KEY (`postskill_id`),
        KEY `FK394tjxd6bfnpexi59qv47guyv` (`post_id`),
        KEY `FK8j49khfx6fjxfhj2lxtf0p0vs` (`skill_id`),
        CONSTRAINT `FK394tjxd6bfnpexi59qv47guyv` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`),
        CONSTRAINT `FK8j49khfx6fjxfhj2lxtf0p0vs` FOREIGN KEY (`skill_id`) REFERENCES `skill` (`skill_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `reference`
        --

        DROP TABLE IF EXISTS `reference`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `reference` (
        `reference_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `chat_number` bigint DEFAULT NULL,
        `chat_time` datetime(6) DEFAULT NULL,
        `content` varchar(255) DEFAULT NULL,
        `nickname` varchar(255) DEFAULT NULL,
        `task_id` bigint DEFAULT NULL,
        PRIMARY KEY (`reference_id`),
        KEY `FKfkkn0dqempuqjsl5d4mxoypas` (`task_id`),
        CONSTRAINT `FKfkkn0dqempuqjsl5d4mxoypas` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `reply`
        --

        DROP TABLE IF EXISTS `reply`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `reply` (
        `reply_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `content` varchar(255) DEFAULT NULL,
        `post_id` bigint DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`reply_id`),
        KEY `FKnpyg5e6pqr2v1y4y6pacte11q` (`post_id`),
        KEY `FKmtfnx1efxiq3p9n6kh3org2yj` (`user_id`),
        CONSTRAINT `FKmtfnx1efxiq3p9n6kh3org2yj` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
        CONSTRAINT `FKnpyg5e6pqr2v1y4y6pacte11q` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `skill`
        --

        DROP TABLE IF EXISTS `skill`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `skill` (
        `skill_id` bigint NOT NULL AUTO_INCREMENT,
        `skill_name` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`skill_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `statistic`
        --

        DROP TABLE IF EXISTS `statistic`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `statistic` (
        `statistic_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `afternoon_commit` bigint DEFAULT NULL,
        `morning_commit` bigint DEFAULT NULL,
        `night_commit` bigint DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        PRIMARY KEY (`statistic_id`),
        KEY `FK878w2qnikucu4vpvbdyqmux9a` (`chatroom_id`),
        CONSTRAINT `FK878w2qnikucu4vpvbdyqmux9a` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `task`
        --

        DROP TABLE IF EXISTS `task`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `task` (
        `task_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `description` varchar(255) DEFAULT NULL,
        `progress` varchar(255) DEFAULT NULL,
        `task_group_id` bigint DEFAULT '0',
        `chatroom_id` bigint DEFAULT NULL,
        `user_id` bigint DEFAULT NULL,
        PRIMARY KEY (`task_id`),
        KEY `FKn5xfgf0vpxraa0cq4f6gdge3x` (`chatroom_id`),
        KEY `FKbhwpp8tr117vvbxhf5sbkdkc9` (`user_id`),
        CONSTRAINT `FKbhwpp8tr117vvbxhf5sbkdkc9` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
        CONSTRAINT `FKn5xfgf0vpxraa0cq4f6gdge3x` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `task_group`
        --

        DROP TABLE IF EXISTS `task_group`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `task_group` (
        `taskgroup_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `deadline` date DEFAULT NULL,
        `description` varchar(255) DEFAULT NULL,
        `name` varchar(255) DEFAULT NULL,
        `priority` varchar(255) DEFAULT NULL,
        `progress` varchar(255) DEFAULT NULL,
        `chatroom_id` bigint DEFAULT NULL,
        PRIMARY KEY (`taskgroup_id`),
        KEY `FKh7avd7vfwktkxvck8gya721v0` (`chatroom_id`),
        CONSTRAINT `FKh7avd7vfwktkxvck8gya721v0` FOREIGN KEY (`chatroom_id`) REFERENCES `chat_room` (`chatroom_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;

        --
        -- Table structure for table `users`
        --

        DROP TABLE IF EXISTS `users`;
        /*!40101 SET @saved_cs_client     = @@character_set_client */;
        /*!50503 SET character_set_client = utf8mb4 */;
        CREATE TABLE `users` (
        `user_id` bigint NOT NULL AUTO_INCREMENT,
        `created_at` datetime(6) DEFAULT NULL,
        `updated_at` datetime(6) DEFAULT NULL,
        `detail_introduction` varchar(255) DEFAULT NULL,
        `email` varchar(255) DEFAULT NULL,
        `github_id` varchar(255) DEFAULT NULL,
        `introduction` varchar(255) DEFAULT NULL,
        `nickname` varchar(255) DEFAULT NULL,
        `password` varchar(255) DEFAULT NULL,
        `position` varchar(255) DEFAULT NULL,
        `profile_color` varchar(255) DEFAULT NULL,
        `profile_image` varchar(255) DEFAULT NULL,
        `refresh_token` varchar(500) DEFAULT NULL,
        `role` varchar(255) DEFAULT NULL,
        `social_id` varchar(255) DEFAULT NULL,
        PRIMARY KEY (`user_id`)
        ) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        /*!40101 SET character_set_client = @saved_cs_client */;
        /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

        /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
        /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
        /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
        /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
        /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
        /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
        /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

        -- Dump completed on 2023-10-05 16:31:25

        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('1', 'java');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('2', 'python');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('3', 'javascript');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('4', 'html5');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('5', 'css3');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('6', 'c');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('7', 'c++');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('8', 'r');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('9', 'flutter');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('10', 'dart');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('11', 'kotlin');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('12', 'pwa');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('13', 'php');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('14', 'django');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('15', 'spring');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('16', 'vue');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('17', 'react');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('18', 'next');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('19', 'node');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('20', 'angular');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('21', 'jenkins');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('22', 'docker');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('23', 'aws');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('24', 'kubernetes');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('25', 'three');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('26', 'aframe');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('27', 'unity');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('28', 'unreal');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('29', 'tomcat');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('30', 'spark');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('31', 'hadoop');
        INSERT INTO `ssafychat`.`skill` (`skill_id`, `skill_name`) VALUES ('32', 'git');


        ```
  
  4. Redis
     
     ```
     docker pull redis
      sudo docker run -p 6379:6379 redis
     ```

- ##### 서비스 이용 방법
  
  - GitHub OAuth 인증
  
