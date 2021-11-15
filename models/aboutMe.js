const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;

const aboutMeSchema = new Schema({
    lastName: String,
    firstName: String,
    description: String,
    cv_url: String,
    update_date : {
        type : String,
        default : Date.now()
    },
    photo_url : String
});
// Model
const AboutMe = mongoose.model('about_me', aboutMeSchema);


module.exports = AboutMe;