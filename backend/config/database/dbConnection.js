const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECTION);
    }catch(error){
        console.log(error.message);
    }
}

module.exports = dbConnection;