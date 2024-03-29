const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    
    firstName : {
        type: String,
        default :''
    },
    lastName : {
        type: String,
        default :''
    },
    email :{
        type: String,
        default :''
    },
    password: {
        type: String,
        default :''
    },
    isDeleted: {
        type: Boolean,
        default : false
    },
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password); 
};

// Model
const User = mongoose.model('user', userSchema);

module.exports = User;
