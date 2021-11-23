const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillItemSchema = new Schema({
    
    order: Number,
    name : String,
    level : Number,
    color: String, 
    update_date : {
        type : String,
        default : Date.now()
    }
});

// Model
const skillItem = mongoose.model('skillitem', skillItemSchema);

module.exports = skillItem;