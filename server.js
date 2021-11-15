// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./api');

const MONGODB_URL = "mongodb+srv://haddarmedelhedi:Therebel89@cluster0.sm41i.mongodb.net/my_portfolio_DB?retryWrites=true&w=majority";
// const MONGODB_URL =  ""

mongoose.connect(process.env.MONGODB_URI || MONGODB_URL, {
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

// app.use(cors());
// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`server is starting ut ${PORT}`)); 
