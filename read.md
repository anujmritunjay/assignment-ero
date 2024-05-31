* Prerequisite
    1. Node should be installed
    2. Postgresql should be installed

* Please change the database credentials in src/config/config.json before run

* Run in the local development
    1. Install dependency - npm install
    2. Start Local development - npm start

* Run with build using PM2
    1. Install dependency - npm install
    1. Install pm2 global - npm i pm2 -g
    2. Make build - npm run build
    3. Run build - pm2 start ecosystem.config.js --env development
 
