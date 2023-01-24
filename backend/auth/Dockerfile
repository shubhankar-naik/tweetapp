FROM openjdk:11
EXPOSE 9003
ADD target/auth.jar auth.jar
ENTRYPOINT ["java","-jar","/auth.jar"]