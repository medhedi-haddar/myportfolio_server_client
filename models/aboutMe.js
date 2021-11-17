const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;

const aboutMeSchema = new Schema({
    lastName: String,
    firstName: String,
    description: String,
    
    update_date : {
        type : String,
        default : Date.now()
    },
    git_link : String,
    cv_url: String,
    profileImage : String
});


// Model
const AboutMe = mongoose.model('about_me', aboutMeSchema);


module.exports = AboutMe;