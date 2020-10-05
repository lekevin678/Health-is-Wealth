
module.exports = function(){ 
    var express = require('express');
    var fetch = require('node-fetch');
    var router = express.Router();

    function errorHandle(fetch_response, res){
        if(fetch_response.status != 200){
            if (fetch_response.status == 402){
                res.redirect('/error/api');
                res.end();
            }
            else{
                res.redirect('/error/400');
                res.end();
            }
            
        }
        else{
            return;
        }
    }

    async function getSearch (req,res,context, pageInfo){  

        var offset = (pageInfo.page - 1) * 10;
        var fetch_response = await fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=6d1029b3aefa45b094481c1371f4dc21&query=" + req.query.searchInput + "&offset="+ offset);
        console.log(fetch_response);
        errorHandle(fetch_response, res);

            var context = await fetch_response.json();

            if (context.totalResults === 0 || context.totalResults <= 10   ){
                pageInfo.page = 1;
                pageInfo.nextPage = 1;
                pageInfo.prevPage = 1;

                context.pages = pageInfo;
                context.pages.totalPages = 1;
            }
            else{
                var idList = "";
                for (i=0; i < context.results.length ; i++){
                    idList += context.results[i].id + ',';
                }

                fetch_response = await fetch("https://api.spoonacular.com/recipes/informationBulk?apiKey=6d1029b3aefa45b094481c1371f4dc21&ids=" + idList );
                errorHandle(fetch_response, res);

                var recipe_Data = await fetch_response.json();

                for (i=0; i < context.results.length ; i++){
                    context.results[i].healthGrade = recipe_Data[i].healthScore;
                    context.results[i].readyIn = recipe_Data[i].readyInMinutes;
                }
            }

            context.pages = pageInfo;
            context.pages.totalPages = Math.floor(context.totalResults/context.number);
            context.term = req.query.searchInput;
            context.jsscripts =['pages.js'];
            console.log(context);      

            res.render('search', context);

    }

    router.get('/', function(req, res){
        var context = {};
        var pageInfo = {};

        if (req.query.page > 1){
            pageInfo.page = parseInt(req.query.page, 10);
            pageInfo.nextPage = pageInfo.page + 1;
            pageInfo.prevPage = pageInfo.page - 1;
        }
        else{
            pageInfo.page = 1;
            pageInfo.nextPage = pageInfo.page + 1;
            pageInfo.prevPage = pageInfo.page
        }

        console.log("in get: " + req.query.searchInput);
        

        getSearch(req,res,context, pageInfo);
    });

    


    


    return router;
}();