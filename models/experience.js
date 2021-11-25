const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    title: String,
    entreprise: String,
    description: String,
    tags: [{
        type: String
    }],
    beginDate: {
        type : String,
        default : ''
    },
    endDate : {
        type : String,
        default : ''
    },
    update_date : {
        type : String,
        default : Date.now()
    }
});

// Model
const Experience = mongoose.model('experience', experienceSchema);

module.exports = Experience;