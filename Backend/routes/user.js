const express = require(`express`);

const User = require('../db/index.js');
const router = express.Router();
const {userMiddleware , userJWTMiddleware} = require('../middlewares/user.js');
const jwt = require(`jsonwebtoken`);
const {private_key}= require('../secrets.js');

router.post('/signup' , userMiddleware , function(req , res)
{
    try{
        const username = req.body.username ;
        const password = req.body.password ;
        const stat = User.create({
            username : username ,
            password : password 
        })
        
        const token = jwt.sign({username : username , password : password} ,private_key , {expiresIn : '1h'})
        res.status(200).json({
            jwt : token 
        })
    }
    catch(err)
    {
        return res.status(500).json({
            msg : "There is something up with our servers"
        })
    }

});

router.get('/todos' , userJWTMiddleware ,async function(req ,res){
// if control has reached here this means the user has valid jwt and we have extracted username amd password from it
    try
    {   const {username , password} = req.user;
        // if there are multiple entries with the same username and password, this could lead to 
        // unexpected behavior, as it will only retrieve one of the matching documents.
        const user =await User.findOne({username : username , password : password});
        if(!user) throw new Error("jwt is valid but cannot find user in database");

        //console.log(user);
        const list = user["todos"];
        const final = list.map(function(arr){
            return {
                id : arr["_id"] ,
                title : arr["title"],
                description : arr["description"],
                status : arr["status"]
            }
        })
        return res.status(200).json(final);

    }
    catch(err)
    {
        if(err.message === "jwt is valid but cannot find user in database") return res.status(401).json({msg : "User not found"})
        return res.status(500).json({msg : "There is something up with our servers"});
    }
})

router.post('/upload' , userJWTMiddleware ,async function(req , res){
    try
    {   const {username , password} = req.user;
        const title = req.body.title;
        const description = req.body.description;
        
        // if there are multiple entries with the same username and password, this could lead to 
        // unexpected behavior, as it will only retrieve one of the matching documents.
        const user =await User.findOne({username : username , password : password});
        
        if(!user) throw new Error("jwt is valid but cannot find user in database");

        const final = await user["todos"].push({
            title : title,
            description : description,
            status : false
        })
        await user.save();
        return res.status(200).json({msg : "Todo added succesfully"});
        
    }
    catch(err)
    {
        if(err.message === "jwt is valid but cannot find user in database") return res.status(401).json({msg : "User not found"})
        else return res.status(500).json({msg : "There is something up with our servers"});
    }
})


module.exports = router