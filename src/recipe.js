
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

    router.get('/:id', async function(req, res){
        console.log("recipe ID: " + req.params.id)

        var context = {};
        var callbackCount = 0;

        var fetch_response = await fetch("https://api.spoonacular.com/recipes/" + req.params.id + "/information?apiKey=6d1029b3aefa45b094481c1371f4dc21&includeNutrition=true");
        errorHandle(fetch_response, res);

        

            var recipe_Data = await fetch_response.json();
            console.log("recipe_Data received");
            recipe_Data.totalPrice = 0.0;
            var i;
            for (i=0; i < recipe_Data.extendedIngredients.length ; i++){
                var num = recipe_Data.extendedIngredients[i].amount;
                recipe_Data.extendedIngredients[i].amount = Math.round((num + Number.EPSILON) * 100) / 100;

                fetch_response = await fetch("https://api.spoonacular.com/food/ingredients/" + recipe_Data.extendedIngredients[i].id + "/information?apiKey=6d1029b3aefa45b094481c1371f4dc21&amount=" + recipe_Data.extendedIngredients[i].amount + "&unit=" + recipe_Data.extendedIngredients[i].unit);
                errorHandle(fetch_response, res);
                    var ingr_data = await fetch_response.json();
                    recipe_Data.extendedIngredients[i].price = ingr_data.estimatedCost.value / 100;
                    recipe_Data.extendedIngredients[i].price = recipe_Data.extendedIngredients[i].price.toFixed(2);

                    var deci = parseFloat(recipe_Data.extendedIngredients[i].price);
                    recipe_Data.totalPrice = parseFloat(recipe_Data.totalPrice) + parseFloat(deci);
                    recipe_Data.totalPrice = parseFloat(recipe_Data.totalPrice).toFixed(2);
            }

            for (i=0; i < recipe_Data.nutrition.nutrients.length; i++){
                if (recipe_Data.nutrition.nutrients[i].title == "Calories"){
                    recipe_Data.calories = {};
                    recipe_Data.calories.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.calories.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.calories.unit = recipe_Data.nutrition.nutrients[i].unit;

                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Fat"){
                    recipe_Data.fat = {};
                    recipe_Data.fat.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.fat.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.fat.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Carbohydrates"){
                    recipe_Data.carbohydrates = {};
                    recipe_Data.carbohydrates.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.carbohydrates.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.carbohydrates.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Sugar"){
                    recipe_Data.sugar = {};
                    recipe_Data.sugar.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.sugar.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.sugar.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Protein"){
                    recipe_Data.protein = {};
                    recipe_Data.protein.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.protein.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.protein.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Saturated Fat"){
                    recipe_Data.sat_fat = {};
                    recipe_Data.sat_fat.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.sat_fat.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.sat_fat.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Cholesterol"){
                    recipe_Data.cholesterol = {};
                    recipe_Data.cholesterol.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.cholesterol.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.cholesterol.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Sodium"){
                    recipe_Data.sodium = {};
                    recipe_Data.sodium.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.sodium.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.sodium.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Fiber"){
                    recipe_Data.fiber = {};
                    recipe_Data.fiber.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.fiber.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.fiber.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
                else if (recipe_Data.nutrition.nutrients[i].title == "Vitamin A"){
                    recipe_Data.vit_a = {};
                    recipe_Data.vit_a.amount = recipe_Data.nutrition.nutrients[i].amount;
                    recipe_Data.vit_a.dv = recipe_Data.nutrition.nutrients[i].percentOfDailyNeeds;
                    recipe_Data.vit_a.unit = recipe_Data.nutrition.nutrients[i].unit;
                }
            }

            recipe_Data.jsscripts = ['procon.js'];

            console.log(recipe_Data);

            res.render("recipe", recipe_Data);

            // res.render("recipe");

    });


    
    return router;
}();