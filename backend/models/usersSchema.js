const { Schema, default: mongoose } = require('mongoose');

const usersSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        require : true,
    },
    refreshToken : {
        type : String,
    }
},{timestamps: true})

module.exports = mongoose.model('User',usersSchema);