# What is the project?

This project is a Populate Script and a RESTful API.

When you run the application, the script will populate the database with all the designated countries, 
for the sake of performance as this is not a in production application the default script comes with only three countries, Brazil, Argentina and Chile.

The API allow users to create, retrieve, update and delete universities and counts with pagination. 

# Installation Guide

These instructions will get you a copy of the project up and running on your local machine.
The installation guide assumes that you have Docker and Docker Compose installed. Make sure that you have it and you are good to go!

1. Clone the project:
```sh
$ git clone "https://github.com/guifaxina/university-api.git" <optional:folder>
```
2. Open the folder that you specified:
```sh
$ cd <folder>
```
3. Build the image and run a Docker container:
```sh
$ docker compose up && docker compose run -d 
```
The server will now be running on "http://localhost:3000"
### API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | /universities | List all the universities |
| GET    | /universities/:id | Retrieve university by id |
| POST   | /universities | Create new university |
| PUT   | /universities/:id | Update university by id |
| DELETE   | /universities/:id | Delete university by id |

### Query Parameters 
| Query Parameter | Description | Default Value |
| --------------- | ----------- | ------------- |
| /?search=**country** | List all the universities within that country | - |
| /?page=**number** | Retrieve countries within that page | - |
| /?offset=**number** | Sets a threshold of how many universities will be retrieved | 5 |

### Built with
* TypeScript
* Node.js
  * Express
  * SuperTest
  * Jest
* MongoDB
* Docker

### Author
* [Guilherme Faxina](https://www.linkedin.com/in/guifaxina/)
