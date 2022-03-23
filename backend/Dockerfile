FROM openjdk:11

ARG JAR_FILE= ./target/backend-0.0.1-SNAPSHOT.war

EXPOSE 8000

COPY ${JAR_FILE}  /user/local/app.war

WORKDIR /user/local

ENTRYPOINT ["java", "-jar", "app.war"]
