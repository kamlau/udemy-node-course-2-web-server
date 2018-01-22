const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// register logging middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log) // print to console the current time when a request is made
    fs.appendFile('server.log', log + '\n', (err) => {  // log to server.log the current time when a request is made
        if(err) {
            console.log('Unable to appel to server.log.');
        }
    });
    next(); //the handler to continue execution
});

// // register maintenance middle
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     // because it does not call next, anything below this line will not be called.  This how the maintenance page will be displayed.
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// handle request of '/'
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my home page.'
    });
});


// handle request of '/about'
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});


// bad

app.get('/bad', (req, res) => {
    res.send({
        error: 'bad request'
    });
});

// start of server
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});