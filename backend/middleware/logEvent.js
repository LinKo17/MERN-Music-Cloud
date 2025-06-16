const {v4 : uuid} = require('uuid');
const {format} = require('date-fns');

const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const logEvent = async (message,filename) => {

    const unique = `${format(new Date(),'yyyy/MM/dd\tHH:mm:ss')} ${uuid()} ${message} \n`;

    try{
        if(!fs.existsSync(path.join(__dirname,"..","log"))){
            await fsPromise.mkdir(path.join(__dirname,"..","log"))
        }
        await fsPromise.appendFile(path.join(__dirname,"..","log",filename), unique);

    }catch(error){
        console.log(error.message)
    }
}

const Log = (req,res,next) => {
    logEvent(`${req.method} ${req.url} ${req.get('origin')}`,'Log.txt');
    next();
}

const errorLog = (error, req, res, next) => {
    logEvent(`${req.method} ${req.url} ${req.get('origin')} ${error.message}`, 'errorLog.txt');
    res.status(500).send('Something went wrong.');
}

module.exports = { Log, errorLog };