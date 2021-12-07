require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');
const adminRoutes = require('./routes/adminApi');
const projectRoutes = require('./routes/projects');
const experienceRoutes = require('./routes/experiences');
const educationRoutes = require('./routes/educations');
const aboutMeRoutes = require('./routes/aboutMe');
const skillsRoutes = require('./routes/skills');

mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology :true
});

mongoose.connection.on('connected', ()=>{
    console.log("mongoos is connected . . . !");
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('client/build'));
app.use('/uploads',express.static('uploads'));

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);
app.use('/admin', adminRoutes);
app.use('/projects', projectRoutes);
app.use('/skills', skillsRoutes);
app.use('/experiences', experienceRoutes);
app.use('/educations', educationRoutes);
app.use('/aboutme', aboutMeRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
 });

app.listen(PORT, console.log(`server is starting ut ${PORT}`)); 
