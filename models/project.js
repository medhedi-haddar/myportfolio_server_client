const mongoose = require('mongoose');
// Schema
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: String,
    description: String,
    weblink : String,
    gitlink : String,
    cover : {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'media' 
    },
    create_date : {
        type : String,
        default : Date.now()
    }
});

// Model
const Project = mongoose.model('project', mediaSchema);

module.exports = Project;
