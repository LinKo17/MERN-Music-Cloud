require('dotenv').config();
const express = require('express');
const app = express();

// PORT 
const PORT = process.env.PORT || 2000;

// third-party module
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Database
const dbConnection = require('./config/database/dbConnection');
dbConnection();

// built-in module
const path = require('path');

// custom module
const { Log, errorLog } = require('./middleware/logEvent');




// route
app.use(Log);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const homeRoute = require('./routes/web/home');
app.use("/",homeRoute);

const musicRoute = require('./routes/api/music');
app.use("/api/musics/", musicRoute);

const userRoute = require('./routes/api/user');
// const exp = require('constants');
app.use("/api/users",userRoute);

// testing
// const testRoute = require('./middleware/verfiyToken');
// app.post("/test", testRoute);

// 404 route
app.use((req, res, next) => {
  const contentType = req.get('Content-Type')

  if(contentType == 'application/json'){
    res.status(404).json({'message': '404'})
  }else if(contentType == 'text/plain' || contentType == 'text/xml'){
    res.status(404).send('404 Not Found')
  }else{
    res.status(404).sendFile(path.join(__dirname,"views","404.html"));
  }
  
})

app.use(errorLog);

mongoose.connection.once('open',() => {
  console.log('Database is successfully connected');
  console.log(`${process.env.DB_CONNECTION}`);
  app.listen(PORT,() => console.log(`http://localhost:${PORT}`));
})