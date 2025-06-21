const allowedOrigins = require('./allowedOrigins');

const corsOption = {
    origin : (origin,callback) => {
        if(allowedOrigins.includes(origin) || !origin){
            callback(null,true);
        }else{
            callback(new Error("CORS don't allowd"));
        }
    }
}

module.exports = corsOption;