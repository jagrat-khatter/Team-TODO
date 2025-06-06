const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const userRouter = require('./routes/user.js');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.use("/user" , userRouter);

app.listen(3000 , function(req , res)
{
    console.log(`App is listening on port ${3000}`) ;
})
