
module.exports = function(){ 
    var express = require('express');
    var fetch = require('node-fetch');
    var router = express.Router();

    router.get('/api', function(req, res){
        console.log("API ERROR");
        res.render('apierror');
    });

    router.get('/500', function(req, res){
        console.log("500 ERROR");
        res.render('500');
    });

    


    


    return router;
}();
