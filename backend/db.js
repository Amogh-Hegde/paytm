const mongoose = require('mongoose')
require('dotenv').config();
const {Schema} = mongoose;

const dbURL = process.env.MONGO_URL;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

const User = mongoose.model('User',userSchema);

const accountsSchema = new Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : User,
        required : true
    },
    balance : {
        type : Number,
        required : true 
    }
})


const Accounts = mongoose.model('Accounts',accountsSchema);

module.exports = {
    User,
    Accounts,
}
