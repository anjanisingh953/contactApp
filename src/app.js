const express = require('express');
const cookieParser = require('cookie-parser');
const minifyHTML = require('express-minify-html-terser');

const app = express();
const contactRoutes = require('./routes/contacts');
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public')); //set path for static files such as css,js,image files
app.use(cookieParser());
app.use(minifyHTML({
    override:      true,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));

//set view engine
app.set('view engine','ejs');
app.use('/',contactRoutes);

module.exports = app;
