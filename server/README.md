## Workshop 37

## Dev flow

Server side

```
0. Connect mysql and execute schema.sql
1. Add dependencies to the pom.xml (json, jaxb runtime, mysql, aws s3)
2. Setup properties on the application.properties (mysql, do, redis..)
3. Test server -> mvn spring-boot:run
4. Implement AppConfig.java -> setup connection to s3 do
5. Manually test -> Upload a file to DigitalOcean 'do' via Postman
6. Implement S3 Service -> Provide upload method
7. FileUploadController -> @Autowired S3Service
    - @PostMapping (consumes=MediaType.MULTIPART_FORM_DATA_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
8. Implement file upload SQL repository service
```

Client side (Angular)

```
1. Setup proxy.config.ts -> ng server to route traffic from 4200 to 8080 (server side invocation)
2. npm i ngx-webcam (third party library to use your computer webcam) **
3. Style the app (material.modules.ts) inject to the app.module
4. Inject all the relevant modules -> Reactiveforms, HttpClient, webcam etc..
5. Generate components using cli "ng g c components/<name> --flat --skip-tests"
6.. Enable PWA (need to be in the main client directory)
```
ng add @angular/pwa --project <project-name>
```
7. Update routing rules (app-routing)
8. Implement the model (result)
9. Incorporate nav and router outlet on your landing page 
10. Implement camera service
11. Implement camera component; able to capture the image (dataURL)
12. Implement upload component
13. Implement view component
```

## MacOS
```
export MYSQL_DB_URL=
export MYSQL_DB_USERNAME=
export MYSQL_DB_PASSWORD=

export DO_ACCESS_KEY=
export DO_SECRET_KEY=
export DO_ENDPOINT=sgp1.digitaloceanspaces.com
export DO_ENDPOINT_REGION=sqp1
export DO_BUCKET_NAME=tdbucket
```

## Windows
```
set MYSQL_DB_URL=
set MYSQL_DB_USERNAME=
set MYSQL_DB_PASSWORD=

set DO_ACCESS_KEY=
set DO_SECRET_KEY=
set DO_ENDPOINT= sgp1.digitaloceanspaces.com
set DO_ENDPOINT_REGION= sqp1
```

