const mongoose = require(`mongoose`);
const {dbString} = require('../secrets.js')
mongoose.connect(dbString);
// Connecting to Db

const UserSchema = new mongoose.Schema({
    username : String ,
    password : String,
    todos :[{
        title : String ,
        description : String ,
        status : Boolean
    }]
})

const User = mongoose.model('User' , UserSchema);

module.exports = User