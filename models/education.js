const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    diplome: String,
    university: String,
    country: String,
    description: String,
    obtainedDate: {
        type : String,
        default : ''
    },
   
    update_date : {
        type : String,
        default : Date.now()
    }
});

// Model
const Education = mongoose.model('education', educationSchema);

module.exports = Education;