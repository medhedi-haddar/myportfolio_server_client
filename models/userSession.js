const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    
    userId : {
        type: mongoose.Schema.Types.ObjectId, 
        default : ''
    },
    timeStamp : {
        type : Date,
        default : Date.now()
    },
    isDeleted : {
        type : Boolean,
        default : false
    }

});

// Model
const UserSession = mongoose.model('userSession', userSessionSchema);

module.exports = UserSession;