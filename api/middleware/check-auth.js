const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next)=>{
    try{

        //authorization sending token with the body
       // const decoded = jwt.verify(req.body.token, "secret");

       //authorization sending token with the header - authorization header
       const token = req.headers.authorization.split(" ")[1];
    //    console.log(token, "hello")
       const decoded = jwt.verify(token,process.env.MY_HASH_SECRET);
       req.userData = decoded;
       next();
    }catch(error){
        res.status(401).json({
            message:'Auth Failled - Check !!!'
        });
    }
}