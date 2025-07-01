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
    const email = req.user.email;

    try{
        // change file name
        const checkExt = musicName.includes('.mp3') ? "" : ".mp3";
        const changeMusicName = format( new Date(), "yyyyMMdd_HHmmss") + `_${uuid()}_` + musicName +  checkExt;
        await fsPromise.rename(path.join(__dirname,"..","uploads",originalname),path.join(__dirname,"..","uploads",changeMusicName));

        if(playlistOption == "new"){
            const { playlistName,option} = req.body
            //validation section
            if(!playlistName) return res.status(400).json({'message': [
                {type: "field", msg: "playlist name is required ", path: "playlistName"}
            ]});
            const checkPlaylistUnique = await PLAYLIST.findOne({email,playlist_name:playlistName});
            if(checkPlaylistUnique) return res.status(400).json({'message': [
                {type: "field", msg: "playlist name must be unique ", path: "playlistName"}
            ]});
            if(playlistName.length >= 1 && playlistName <= 30) return res.status(400).json({'message': [
                {type: "field", msg: "playlist name must be 1–30 characters", path: "playlistName"}
            ]});
            if(!option) return res.status(400).json({'message': [
                {type: "field", msg: "option is required", path: "option"}
            ]});

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

const show = async (req,res) => {
    const email = req.user.email;
    const playlists = await PLAYLIST.find({email});
    res.status(200).json({'message': playlists});
}

const playlist = async (req,res) => {
    const {playlist_name} = req.body;
    const takePT = await PLAYLIST.findOne({email:req.user.email,playlist_name});
    if(!takePT) return res.status(400).json({
        "message": [
            {type: "field", msg: "playlist name is invalid", path: "none"}
        ]
    })
    return res.send({
        message : takePT
    });
}

const playlistDel = (req,res) => {
    return res.json({'message': 'deleting playlist'});
}

const musicDel = async (req,res) => {
    const {_id, music_name} = (req.body)
    if(!_id || !music_name) return res.status(400).json({
        message : [
            {type: "field", msg: "Information are invalid", path: "none"}
        ]
    });
    const findPT = await PLAYLIST.findOne({_id});
        if(!findPT) return res.status(400).json({
        message : [
            {type: "field", msg: "Information are invalid", path: "none"}
        ]
    });

    findPT.music_name = findPT.music_name.filter(music => music !== music_name)
    await findPT.save();
    await fsPromise.unlink(path.join(__dirname,"..","uploads",music_name));
    const findPlaylist = await PLAYLIST.find({email: req.user.email});
    
    return res.status(200).json({'message':findPlaylist});
}

module.exports = {
    create,
    show,
    playlist,
    playlistDel,
    musicDel
}