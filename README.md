# Welcome to the SD-Social-Media-App!
This Project been made React, Node.js for the Front-End, Maven Spring Boot Java for the Backend/Server and PostgreSQL and Mongodb for the Database.
## First Download the Project
### To Run the Program will be run on the Command Line <br>
* Open the Project Folder and Open the Command Line <br>
### To Clone the Project in Command Line
* `git clone https://github.com/CianDickerHughes/SD-Social-Media-App.git`
<br>or
* Download the .zip folder ([SD-Social-Media-App]https://github.com/CianDickerHughes/SD-Social-Media-App/archive/refs/heads/main.zip) and extract/decompress the folder

## Running Gui
### Setup
* First go into countries-geo-guessing-assignment folder - `cd sd-social-media-app` <br>
* Install npm - `npm install` or `npm i` <br>
### Client-Side
* Run This Command to start Client-Side - `npm start` <br>
* This will start the Client-Side at - `http://localhost:3000/` <br>
--------------------------------------------------------------------------
## Running Server
### Running the Server (Command Line/ CMD)
* First go into BackEnd folder - `cd BackEnd\BackEndSD` <br>
* Run This Command to start Server - `mvn spring-boot:run` <br>
* This will start the Server at  `http://localhost:8080/` <br>
Or
### Running the Server (Eclipse IDE)
* Open the server by eclipse IDE and have Spring Boot installed from the market place <br>
* Import BackEndSD to eclipse <br>
* Right click on project file and Run As Spring Boot App <br>
### Whats need to run server Locally
<p>PostgreSQL - > localhost:5432</p>
<p>SQL and Manven install to run Locally</p>
<ul>
  <li>([PostgreSQL]https://www.postgresql.org/download/)</li>
  <li>Tables:</li>
  <p>`CREATE TABLE users (
      user_id SERIAL PRIMARY KEY,
  	  uname VARCHAR(50) NOT NULL,
      username VARCHAR(50) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
      profile_img_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  	is_private BOOLEAN NOT NULL DEFAULT FALSE,
  	bio TEXT
  ); `</p>
  <li>([Spring Boot Java Maven])</li>
  <li>([Maven]https://maven.apache.org/download.cgi)</li>
  <li>you need apache-maven-x.x.x-src.zip</li>
</ul>
