FROM maven:3.8.5-openjdk-17
#FROM amazoncorretto:17

WORKDIR /back-end
COPY . .
RUN mvn clean install

CMD mvn spring-boot:run
