module.exports = function(){ 
    var express = require('express');
    var fetch = require('node-fetch');
    var router = express.Router();

    router.get('/', async function(req, res){
        res.render("about");
    });

    return router;
}();