# syntax=docker/dockerfile:1

#
# Build stage
#
FROM arm32v7/maven:3.6.0-jdk-11-slim AS build
COPY app /home/greencore/app
COPY backend /home/greencore/backend

RUN mvn -f /home/greencore/backend/pom.xml clean install
RUN mvn -f /home/greencore/app/pom.xml clean package

#
# Package stage
#
FROM arm32v7/eclipse-temurin:11
COPY --from=build /home/greencore/app/target/app-1.0-SNAPSHOT-jar-with-dependencies.jar /usr/local/lib/greencore.jar
ENTRYPOINT ["java","-jar","/usr/local/lib/greencore.jar"]