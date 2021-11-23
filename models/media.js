const mongoose = require('mongoose');
// Schema
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: String,
    description: String,
    url : String,
    model : {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'testAboutMe' 
    },
   create_date : {
        type : String,
        default : Date.now()
    }
});

// Model
const Media = mongoose.model('media', mediaSchema);

module.exports = Media;
