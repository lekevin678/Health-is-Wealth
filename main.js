var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fetch = require('node-fetch');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.use('/', express.static('public'));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 5000);

app.use('/recipe', require("./src/recipe.js"));
app.use('/search', require("./src/search.js"));
app.use('/advancedsearch', require("./src/advsearch.js"));
app.use('/error', require("./src/error.js"));
app.use('/about', require("./src/about.js"));


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});