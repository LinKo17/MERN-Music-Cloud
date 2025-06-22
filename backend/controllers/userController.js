/*
    1. Login
    2. Register
    3. Logout
    4. refresh token
*/
const { validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const USER = require('../models/usersSchema');

const login = async (req,res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).json({'message': result.array()});
    const { email, password } = matchedData(req);
    const verifyUser = await USER.findOne({email}).exec();
    if(!verifyUser) return res.status(401).json({'message': [
        {type: "field", msg: "Invalid Credential", path: "email"}
    ]});
    const verfiyPassword = await bcrypt.compare(password,verifyUser.password);
    if(!verfiyPassword) return res.status(401).json({'message': [
        {type: "field", msg: "Invalid Credential", path: "email"}
    ]});

    const accessToken = jwt.sign(
        {
            name : verifyUser.name,
            email : verifyUser.email
        },
        process.env.SECRET_ACCESS_TOKEN,
        { expiresIn : '60s'}
    );

    const refreshToken = jwt.sign(
        {
            name : verifyUser.name,
            email : verifyUser.email
        },
        process.env.SECRET_REFRESH_TOKEN,
        { expiresIn : '1d'}
    );

    res.cookie('jwt',refreshToken,{ httpOnly:true, maxAge: 24 * 60 * 60 * 1000, sameSite : process.env.SAME_SITE, secure : process.env.ENV_SECURE === 'true' });

    verifyUser.refreshToken = refreshToken;
    await verifyUser.save();
    
    return res.status(200).json({
        name : verifyUser.name,
        email : verifyUser.email,
        token : accessToken
    });
}

const register = async (req,res) => {
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).json({'message': result.array()});
    const {name, email, password } = matchedData(req);
    
    const checkEmail = await USER.findOne({email});
    if(checkEmail) return res.status(400).json({'message': [
        {type: "field", msg: "The email is already registered", path: "email"}
    ]});
    const user = new USER({
        name,
        email,
        password : await bcrypt.hash(password,10)
    });
    await user.save();
    return res.json({
        name,
        email
    });
}

const logout = async (req,res) => {
    const token = req.cookies;
    if(!token?.jwt ) return res.status(403).json({'message' : 'Unauthorize'});
    const refreshToken = token.jwt.split(" ")[0];
    
    const verifyUser = await USER.findOne({refreshToken});
    if(!verifyUser){
        res.clearCookie('jwt',{httpOnly:true, sameSite: process.env.SAME_SITE, secure: process.env.ENV_SECURE === 'true'});
        return res.sendStatus(401);
    }

    await verifyUser.save();
    res.clearCookie('jwt',{httpOnly:true, sameSite: process.env.SAME_SITE, secure: process.env.ENV_SECURE === 'true'});

    return res.sendStatus(204);
}

const refreshToken = async (req,res) => {
    const token = req.cookies;
    if(!token?.jwt) return res.sendStatus(401);
    const refreshToken = token.jwt;
    const verifyUser = await USER.findOne({refreshToken});
    if(!verifyUser) return res.sendStatus(401)
    
    jwt.verify(
        verifyUser.refreshToken,
        process.env.SECRET_REFRESH_TOKEN,
        async (error,encoded) => {
            if(error || encoded.email != verifyUser.email)  return res.sendStatus(401);
            
            // access token
            const accessToken = jwt.sign(
                {
                    name  : verifyUser.name,
                    email : verifyUser.email
                },
                process.env.SECRET_ACCESS_TOKEN,
                {expiresIn : '60s'}
            );

            // refresh token
            const refreshToken = jwt.sign(
                {
                    name : verifyUser.name,
                    email : verifyUser.email
                },
                process.env.SECRET_REFRESH_TOKEN,
                { expiresIn : '1d'}
            );

            res.cookie(
                'jwt',
                refreshToken,
                {
                    httpOnly : true,
                    maxAge : 24 * 60 * 60 * 1000,
                    sameSite : process.env.SAME_SITE,
                    secure : process.env.ENV_SECURE === 'true'
                }
            );

            verifyUser.refreshToken = refreshToken;
            await verifyUser.save();

            return res.json({accessToken});
        }
    );
    
}

module.exports = {
    login,
    register,
    logout,
    refreshToken
}