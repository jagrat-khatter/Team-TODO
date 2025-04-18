const express = require('express');
const User = require('../db/index.js');
const zod = require('zod');
const schema1 = zod.string().min(1);
const {private_key} = require('../secrets.js');
const jwt = require('jsonwebtoken');
async function userMiddleware(req , res , next)
{
    try
    {const username = req.body.username;
    const password = req.body.password;
    const pass1 = schema1.safeParse(username);
    const pass2 = schema1.safeParse(password);
    const user = await User.findOne({username : username , password : password});
    if(user) {
        throw new Error("Someone already has used this username and password");
    }
    if(!pass1.success || !pass2.success)
    {
        return res.status(400).json({
            msg : "You have sent wrong inputs"
        })
    } 
    next();
    }
    catch(err)
    {
        if(err.message === "Someone already has used this username and password") return res.status(400).json({msg : "Someone already has used this username and password"});
        else return res.status(500).json({msg : "There is something up with our servers"});
    }
}
function userJWTMiddleware(req , res , next)
{ 
    try
    {const token = req.headers.authorization;
    const length = token.length;
    const pass1 = schema1.safeParse(token);
    
    if(!pass1.success) {return res.status(400).json({msg : "You have not sent jwt properly"})}
    const actual_jwt = token.slice(7 , length);
    const response = jwt.verify(actual_jwt , private_key);
    const username = response.username;
    const password = response.password;
    
    req.user ={username , password};
    next();
    }
    catch(err)
    {
        
        if(err.name === "TokenExpiredError") return res.status(401).json({msg : "Your token has expired please signup again"})
        else if(err.name === "JsonWebTokenError") return res.status(401).json({msg : "Invalid Token"}) ;
        else{
            return res.status(500).json({msg : "There is something up with our servers"});
        }
    }
    
}
module.exports={
    userMiddleware,
    userJWTMiddleware
}