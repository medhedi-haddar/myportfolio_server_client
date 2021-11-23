const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    
    title : String,
    description : String,
    skills : [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'skillitem' 
        }
    ],
    update_date : {
        type : String,
        default : Date.now()
    }
});

// Model
const Skills = mongoose.model('skill', skillSchema);

module.exports = Skills;