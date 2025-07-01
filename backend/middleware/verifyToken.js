const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    const { authorization } = req.headers;
    if(!authorization || !authorization.startsWith('Bearer ')) return res.status(401).json({'message' : 'Invalid token'});
    const accessToken = authorization.split(' ')[1];

    jwt.verify(
        accessToken,
        process.env.SECRET_ACCESS_TOKEN,
        (error,decoded) => {
            if(error) return res.status(401).json({'message': [
                {type: "field", msg: "Unauthorized", path: "none"}
            ]});
            req.user = decoded;
            next();
        }
    )

}

module.exports = verifyToken;