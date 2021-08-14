const jwt = require("jsonwebtoken");
const User = require("../model/users");

const auth = async (req,res,next) =>{
    console.log("auth");
    try{
        const cookieToken = await req.cookies.jwtdata;
        if(!cookieToken){
            res.status(422).send({"message":"User Does not exist"});
            next();
        }
        
        console.log(cookieToken);
        const tokenData = await jwt.verify(cookieToken,process.env.SECRET_KEY);
        const isUser = await User.findOne({_id:tokenData.id});
        if(!isUser){
            res.status(422).send({"message":"User Does not exist"});

        }
        req.isUser = isUser;
        req.cookieToken = cookieToken;
        console.l
        next();
        
    }catch(err){
            console.log(" Error ::::::::: "+err);
            
    }
}

module.exports = auth;