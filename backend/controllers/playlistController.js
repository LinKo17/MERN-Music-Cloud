const { validationResult, matchedData } = require("express-validator");
const { format } = require('date-fns');
const { v4 : uuid } = require('uuid');
const fsPromise = require('fs').promises;
const path = require("path");

const PLAYLIST = require('../models/playlistsSchema'); 

const create = async (req,res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).json({'message': result.array()});

    const {originalname} = req.file;
    const { playlistOption, musicName } = matchedData(req);
    const email = "default@gmail.com";

    try{
        // change file name
        const checkExt = musicName.includes('.mp3') ? "" : ".mp3";
        const changeMusicName = format( new Date(), "yyyyMMdd_HHmmss") + `_${uuid()}_` + musicName +  checkExt;
        await fsPromise.rename(path.join(__dirname,"..","uploads",originalname),path.join(__dirname,"..","uploads",changeMusicName));

        if(playlistOption == "new"){
            const { playlistName,option} = req.body
            //validation section
            if(!playlistName) return res.status(400).json({'message':'Playlist Name is required'});
            if(playlistName.length >= 1 && playlistName <= 30) return res.status(400).json({'message':'Music Name must be 1–30 characters'});
            if(!option) return res.status(400).json({'message':'Option is required'});

            // store music inside playlist
            const playlist = new PLAYLIST({
                playlist_name : playlistName,
                email,
                music_name : changeMusicName,
                option
            });
            await playlist.save();

        }else{
            const playlist = await PLAYLIST.findOne({email,playlist_name:playlistOption})
            if(!playlist) return res.status(200).json({'message':playlist});
            playlist.music_name = [changeMusicName,...playlist.music_name];
            await playlist.save();

        }

        // send section
        const findPlaylist = await PLAYLIST.find({email});
        return res.status(200).json({'message':findPlaylist});

    }catch(error){
            console.log(error)
    }

}

const playlistDel = (req,res) => {
    return res.json({'message': 'deleting playlist'});
}

const musicDel = (req,res) => {
    return res.json({'message': 'deleting music'});
}

module.exports = {
    create,
    playlistDel,
    musicDel
}