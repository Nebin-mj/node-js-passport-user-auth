# Authentication With NodeJs And Passport

## To Start The Server

Create .env file and set `sessionSecret=<your secret>` and `mongoUrl=<your mongodb uri>`  
`npm i` (to install required node modules)  
`npm run dev` (to start it with nodemon)  
`npm start` (to start it with node)  
App will be available on http://localhost:5000

## Routes

**GET** `/register`  
**GET** `/login`  
**GET** `/`  
**GET** `/protected-route`  
**GET** `/logout`  
**POST** `/register`  
**POST** `/login`
