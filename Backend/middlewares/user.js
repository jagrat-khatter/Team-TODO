const express = require('express');
const User = require('../db/index.js');
const zod = require('zod');
const schema1 = zod.string().min(1);

function userMiddleware(req , res , next)
{
    const username = req.body.username;
    const password = req.body.password;
    const pass1 = schema1.safeParse(username);
    const pass2 = schema1.safeParse(password);

    if(!pass1.success || !pass2.success)
    {
        return res.status(400).json({
            msg : "You have sent wrong inputs"
        })
    } 
    next();
}
function userJWTMiddleware(req , res , next)
{
    const username = req.body.username;
    const password = req.body.password;
    const token = req.headers.authorization;
    const length = token.length;
    if(length == 0) {
        return res.status(400).json({
            msg : "You have not sent jwt properly"
        })
    }
    const actual_jwt = token.slice(7 , length);
    const pass1 = schema1.safeParse(username);
    const pass2 = schema1.safeParse(password);
    const pass3 = schema1.safeParse()

    if(!pass1.success || !pass2.success)
    {
        return res.status(400).json({
            msg : "You have sent wrong inputs"
        })
    } 

    next();
}