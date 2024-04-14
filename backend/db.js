const mongoose = require('mongoose')
const {Schema} = mongoose;

mongoose.connect('mongodb+srv://admin:practice%20@cluster0.7xrssdb.mongodb.net/paytm');

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        maxLength : 50,
    },
    lastName : {
        type : String,
        required : true ,
        maxLength : 50,
    },
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        minLength : 3,
        maxLength : 30,
    },
    password : {
        type : String, 
        required : true,
        minLength : 8,
    },
})

const updateSchema = new Schema({
    firstName : String,
    lastName : String,
})

const User = mongoose.model('User',userSchema);

module.exports = {
    User
}
