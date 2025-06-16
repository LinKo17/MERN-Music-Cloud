const express = require('express');
const app = express();

// PORT 
const PORT = process.env.PORT || 2000;

// third-party module
// built-in module
const path = require('path');

// custom module
const { Log, errorLog } = require('./middleware/logEvent');




// route
app.use(Log);

const homeRoute = require('./routes/web/home');
app.use("/",homeRoute);

const musicRoute = require('./routes/api/music');
app.use("/api/musics/", musicRoute);

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

app.listen(PORT,() => console.log(`http://localhost:${PORT}`));