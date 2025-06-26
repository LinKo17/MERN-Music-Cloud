const { Schema, default: mongoose } = require('mongoose')

const playlistsSchema = Schema({
    playlist_name: {
        type : String,
        required:true
    },
    email: {
        type : String,
        required : true
    },
    music_name : {
        type : Array,
        required : true
    },
    option : {
        type : String,
        required : true
    }
},{ timestamps:true });

module.exports = mongoose.model('playlist',playlistsSchema)