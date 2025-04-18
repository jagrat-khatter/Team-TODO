const express = require(`express`);
const app = express();
const User = require('../db/index.js');
const router = express.Router();
const userMiddleware = require('../middlewares/user.js');

router.post('/signup' , userMiddleware , function(req , res)
{

});

router.get('/todos' , function(req ,res){

})

router.post('/upload' , userJWTMiddleware , function(req , res){

})



module.exports = router