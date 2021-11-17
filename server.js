require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
// const bodyParser = require('body-parser');

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

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    // }
    app.use('/uploads',express.static('uploads'));

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);


app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
 });



// const { MongoClient } = require('mongodb');
// var ObjectId = require('mongodb').ObjectId
// const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("my_portfolio_DB").collection("about_mes");

//     collection.find({ _id :ObjectId("6192251f60b589380297bdd3")}).then((data)=>{
//         console.log(json(data));
//     }).catch((err) => {
//         console.log("error");
//     });

//   client.close();
// });


app.listen(PORT, console.log(`server is starting ut ${PORT}`)); 
