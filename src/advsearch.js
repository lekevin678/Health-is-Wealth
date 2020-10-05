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

    function getSearchStrings(s, o){
        s.cuisines = "&cuisine=";
        s.excludes = "&excludeIngredients=";
        s.includes = "&includeIngredients=";
        s.diets = "&diet=";

        if("cuisines" in o){
            for (var i=0; i < o.cuisines.length - 1; i++){
                s.cuisines += o.cuisines[i] + ',';
            }
            s.cuisines += o.cuisines[o.cuisines.length - 1];
        }

        if("excludes" in o){
            for (var i=0; i < o.excludes.length - 1; i++){
                s.excludes += o.excludes[i] + ',';
            }
            s.excludes += o.excludes[o.excludes.length - 1];
        }

        if("includes" in o){
            for (var i=0; i < o.includes.length - 1; i++){
                s.includes += o.includes[i] + ',';
            }
            s.includes += o.includes[o.includes.length - 1];
        }

        if("diets" in o){
            for (var i=0; i < o.diets.length - 1; i++){
                s.diets += o.diets[i] + ',';
            }
            s.diets += o.diets[o.diets.length - 1];
        }

    }

    function getMString(req){
        var minMax = req.body.minMax;
        var mString = "";
        
        if (minMax.carbs.min != ""){
            mString += "&minCarbs=" + minMax.carbs.min;
        }

        if (minMax.carbs.max != ""){
            mString += "&maxCarbs=" + minMax.carbs.max;
        }

        if (minMax.protein.min != ""){
            mString += "&minProtein=" + minMax.protein.min;
        }

        if (minMax.protein.max != ""){
            mString += "&maxProtein=" + minMax.protein.max;
        }

        if (minMax.cal.min != ""){
            mString += "&minCalories=" + minMax.cal.min;
        }

        if (minMax.cal.max != ""){
            mString += "&maxCalories=" + minMax.cal.max;
        }

        if (minMax.fat.min != ""){
            mString += "&minFat=" + minMax.fat.min;
        }

        if (minMax.fat.max != ""){
            mString += "&maxFat=" + minMax.fat.max;
        }

        if (minMax.sugar.min != ""){
            mString += "&minSugar=" + minMax.sugar.min;
        }

        if (minMax.sugar.max != ""){
            mString += "&maxSugar=" + minMax.sugar.max;
        }
        return mString
    }

    async function getAdvSearch(req,res,context,pageInfo){
        var searchStrings={};
        getSearchStrings(searchStrings, req.body);
        var minMax = getMString(req);
        var offset = (pageInfo.page - 1) * 10;
        var fetch_response = await fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=6d1029b3aefa45b094481c1371f4dc21&query=" + req.body.query + searchStrings.cuisines +  searchStrings.diets + searchStrings.includes + searchStrings.excludes + minMax + "&offset="+ offset);
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

                context.pages = pageInfo;
                context.pages.totalPages = Math.floor(context.totalResults/context.number);
            }

            
            context.jsscripts =[ 'adv.js', "healthgrade.js"];
            console.log(context);
            context.layout = false;
            res.render("advResults", context); 
    }

    router.get('/', function(req, res){
        var context = {};
        context.jsscripts = ["adv.js", "healthgrade.js"];
        res.render("advSearch", context);
    });

    router.put('/', function(req, res){
        console.log(req.body);
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

        getAdvSearch(req,res,context,pageInfo);
    });


    


    return router;
}();



