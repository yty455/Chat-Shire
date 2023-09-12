# JDK11 image start
FROM openjdk:11-jdk
# 인자 정리 - jar
ARG JAR_FILE=builds/libs/*.jar
# jar file copy
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar", "app.jar"]