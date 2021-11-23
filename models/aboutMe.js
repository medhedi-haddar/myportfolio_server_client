const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutMeSchema = new Schema({
    lastName: String,
    firstName: String,
    description: String,
    git_link : String,
    update_date : {
        type : String,
        default : Date.now()
    },
    cv: {   
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'media' 
        },
    profileImage : {   
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'media' 
        }
});

// Model
const AboutMe = mongoose.model('about_me', aboutMeSchema);

module.exports = AboutMe;