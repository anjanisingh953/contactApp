const express = require('express');
const app = express();
const contactRoutes = require('./routes/contacts');
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public')); //set path for static files such as css,js,image files

//set view engine
app.set('view engine','ejs');
app.use('/',contactRoutes);

module.exports = app;
