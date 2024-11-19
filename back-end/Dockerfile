FROM amazoncorretto:17
EXPOSE 8098
LABEL org.opencontainers.image.authors="harshitkotecha2000@gmail.com"
ARG JAR_FILE=target/pit-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]