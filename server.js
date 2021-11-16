require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology :true
});

mongoose.connection.on('connected', ()=>{
    console.log("mongoos is connected . . . !");
});



app.use(express.json());
app.use(express.urlencoded({extended: false}));

// if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
// }
// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
 });
 
app.listen(PORT, console.log(`server is starting ut ${PORT}`)); 
