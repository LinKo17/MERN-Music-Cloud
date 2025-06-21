const jwt = require('jsonwebtoken');

function verfiyToken(req,res,next){
    const { authorization } = req.headers;
    if(!authorization || !authorization.startsWith('Bearer ')) return res.json({'message' : 'Invalid token'});
    const accessToken = authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.SECRET_ACCESS_TOKEN,
        (error,decoded) => {
            if(error) return res.sendStatus(401);
            req.user = decoded;
            next();
        }
    )

}

module.exports = verfiyToken;