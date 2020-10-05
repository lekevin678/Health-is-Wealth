function dropMenu(t){
    var temp = document.querySelectorAll( "." + t + " .dropDown");
    temp[0].classList.toggle("max");
}



//creates an object that will have the final search queries
var finalSearch = {};

//covers cuisines
var cuisinesList = document.querySelectorAll(".cuisinesList > li");
for (var i=0; i < cuisinesList.length; i++){
    cuisinesList[i].classList.add('off');
}
finalSearch.cuisines = [];
cuisinesList.forEach(function(elem) {
    elem.addEventListener("click", function() {
        var isAdded = elem.classList.toggle("on");
        if(isAdded == true && finalSearch.cuisines.includes(elem.textContent) == false){
            finalSearch.cuisines.push(elem.textContent);
        }
        else if(isAdded == false && finalSearch.cuisines.includes(elem.textContent) == true){
            var index = finalSearch.cuisines.indexOf(elem.textContent);
            finalSearch.cuisines.splice(index, 1);
        }

        console.log("ADDED CUISINE");
    });
    
})


//covers list of diets
var dietsList = document.querySelectorAll(".dietList > li");
for (var i=0; i < dietsList.length; i++){
    dietsList[i].classList.add('off');
}
finalSearch.diets = [];
dietsList.forEach(function(elem) {
    elem.addEventListener("click", function() {
        var isAdded = elem.classList.toggle("on");
        if(isAdded == true && finalSearch.diets.includes(elem.textContent) == false){
            finalSearch.diets.push(elem.textContent);
        }
        else if(isAdded == false && finalSearch.diets.includes(elem.textContent) == true){
            var index = finalSearch.diets.indexOf(elem.textContent);
            finalSearch.diets.splice(index, 1);
        }

        console.log("ADDED DIET");
    });
})




//covers include and exclude ingredients
var includeIngrs = document.getElementById("includeInput");
var includeButton = document.getElementById("includeButton");
var includeList = document.getElementsByClassName("includeList");
finalSearch.includes = [];
var numInclude = 0;

var excludeIngrs = document.getElementById("excludeInput");
var excludeButton = document.getElementById("excludeButton");
var excludeList = document.getElementsByClassName("excludeList");
finalSearch.excludes = [];
var numExclude = 0;
function ingredients(type){
    var ingredient = document.createElement("li");
    var closeButton = document.createElement("button");
    var closeImg = document.createElement('i');

    var input;
    //switch statement for exclude or include
    switch (type){
        case "include":
            //if include, get include textbox, add to final search result. and add to list.
            input = includeIngrs.value.trim();
            input = input.toLowerCase();
            if(input=== 0){
                return false;
            }
            if (finalSearch.includes.includes(input)){
                includeIngrs.value = "";
                return false;
            }
            else{
                finalSearch.includes.push(input);
                closeButton.setAttribute('onClick', 'removeIngredient("'+'list'+numInclude+''+type+'")' );
                ingredient.classList.add('list'+numInclude+type);
                numInclude ++;
                includeIngrs.value = "";
            }
            break;
        case "exclude":
            //if include, get exclude textbox, add to final search result, and add to list.
            var input = excludeIngrs.value.trim();
            input = input.toLowerCase();
            if(input=== 0){
                return false;
            }
            if (finalSearch.excludes.includes(input)){
                excludeIngrs.value = "";
                return false;
            }
            else{
                finalSearch.excludes.push(input);
                closeButton.setAttribute('onClick', 'removeIngredient("'+'list'+numExclude+''+type+'")' );
                ingredient.classList.add('list'+numExclude+type);
                numExclude ++;
                excludeIngrs.value = "";
            }
            break;
    }
    
    //add specific class and adds to DOM
    closeImg.classList.add('fa');
    closeImg.classList.add('fa-close');
    closeButton.classList.add('btn');
    closeButton.classList.add('close');
    
    closeButton.appendChild(closeImg);

    ingredient.innerHTML = input;
    ingredient.appendChild(closeButton);


    switch (type){
        case "include":
            includeList[0].appendChild(ingredient);
            break;
        case "exclude":
            excludeList[0].appendChild(ingredient);
            break;
    }
    console.log("INCLUDED");
    return false;
}

//removes include or exclude ingredients
function removeIngredient(id){
    //get class of ingredient to remove and remove it from both the final search and from the DOM
    var removeLi = document.getElementsByClassName(id);

    if(id.includes("include")){
        var index = finalSearch.includes.indexOf(removeLi[0].textContent);  
        finalSearch.includes.splice(index, 1);
        removeLi[0].parentNode.removeChild(removeLi[0]);
    }
    else{
        var index = finalSearch.excludes.indexOf(removeLi[0].textContent);  
        finalSearch.excludes.splice(index, 1);
        removeLi[0].parentNode.removeChild(removeLi[0]);
    }
    console.log("REMOVED");
}

//on hover, change cursor to pointer
var list = document.querySelectorAll("li");
list.forEach(function(elem){
    elem.addEventListener("mouseover", function() {
        elem.classList.add("pointer");
    });
})

var minCarbs = document.getElementById("min_Carbs");
var maxCarbs = document.getElementById("max_Carbs");
var minProtein = document.getElementById("min_Protein");
var maxProtein = document.getElementById("max_Protein");
var minCal = document.getElementById("min_Cal");
var maxCal = document.getElementById("max_Cal");
var minFat = document.getElementById("min_Fat");
var maxFat = document.getElementById("max_Fat");
var minSugar = document.getElementById("min_Sugar");
var maxSugar = document.getElementById("max_Sugar");
finalSearch.minMax = {};

function checkCarbs(count){
    var min = parseInt(minCarbs.value,10);
    var max = parseInt(maxCarbs.value,10);
    if (min < 0 || max < 0){
        console.log("CARBS are less than 0");
        delete finalSearch.minMax.carbs;
        count.counter ++;
    }

    else if (  min >= max ){
        console.log("CARBS are incorrect");
        delete finalSearch.minMax.carbs;
        count.counter ++;
    }

    else {
        finalSearch.minMax.carbs = {};
        finalSearch.minMax.carbs.min = "";
        finalSearch.minMax.carbs.max = "";
        if (!isNaN(min) || !isNaN(max)){
            if (!isNaN(min)){
                finalSearch.minMax.carbs.min = min;
            }
            if (!isNaN(max)){
                finalSearch.minMax.carbs.max = max;
            }
        }      
    }

}

function checkProtein(count){
    var min = parseInt(minProtein.value,10);
    var max = parseInt(maxProtein.value,10);

    if (min < 0 || max < 0){
        console.log("PROTEIN are less than 0");
        delete finalSearch.minMax.protein;
        count.counter ++;
    }

    else if (  min >= max ){
        console.log("PROTEIN are incorrect");
        delete finalSearch.minMax.protein;
        count.counter ++;
    }

    else {
        finalSearch.minMax.protein = {};
        finalSearch.minMax.protein.min ="";
        finalSearch.minMax.protein.max = "";
        if (!isNaN(min) || !isNaN(max)){
            if (!isNaN(min)){
                finalSearch.minMax.protein.min = min;
            }
            if (!isNaN(max)){
                finalSearch.minMax.protein.max = max;
            }
        }      
    }

    
}

function checkCal(count){
    var min = parseInt(minCal.value,10);
    var max = parseInt(maxCal.value,10);

    if (min < 0 || max < 0){
        console.log("CALORIES are less than 0");
        delete finalSearch.minMax.cal;
        count.counter ++;
    }

    else if (  min >= max ){
        console.log("CALORIES are incorrect");
        delete finalSearch.minMax.cal;
        count.counter ++;
    }

    else {
        finalSearch.minMax.cal = {};
        finalSearch.minMax.cal.min = "";
        finalSearch.minMax.cal.max = "";
        if (!isNaN(min) || !isNaN(max)){
            if (!isNaN(min)){
                finalSearch.minMax.cal.min = min;
            }
            if (!isNaN(max)){
                finalSearch.minMax.cal.max = max;
            }
        }      
    }
}

function checkFat(count){
    var min = parseInt(minFat.value,10);
    var max = parseInt(maxFat.value,10);

    if (min < 0 || max < 0){
        console.log("FATS are less than 0");
        delete finalSearch.minMax.fat;
        count.counter ++;
    }

    else if (min >= max){
        console.log("FATS are incorrect");
        delete finalSearch.minMax.fat;
        count.counter ++;
    }

    else {
        finalSearch.minMax.fat = {};
        finalSearch.minMax.fat.min = "";
        finalSearch.minMax.fat.max = "";
        if (!isNaN(min) || !isNaN(max)){
            if (!isNaN(min)){
                finalSearch.minMax.fat.min = min;
            }
            if (!isNaN(max)){
                finalSearch.minMax.fat.max = max;
            }
        }      
    }
}

function checkSugar(count){
    var min = parseInt(minSugar.value,10);
    var max = parseInt(maxSugar.value,10);

    if (min < 0 || max < 0){
        console.log("SUGARS are less than 0");
        delete finalSearch.minMax.sugar;
        count.counter ++;
    }

    else if ( min >= max){
        console.log("SUGARS are incorrect");
        delete finalSearch.minMax.sugar;
        count.counter ++;
    }

    else {
        finalSearch.minMax.sugar = {};
        finalSearch.minMax.sugar.min = "";
        finalSearch.minMax.sugar.max = "";
        if (!isNaN(min) || !isNaN(max)){
            if (!isNaN(min)){
                finalSearch.minMax.sugar.min = min;
            }
            if (!isNaN(max)){
                finalSearch.minMax.sugar.max = max;
            }
        }      
    }
}

function checkMinMax(){
    var count = {};
    count.counter = 0;
    checkCarbs(count);
    checkProtein(count);
    checkCal(count);
    checkFat(count);
    checkSugar(count);
    console.log(count);
    console.log(finalSearch);
    if (count.counter > 0){
        return false;
    }
    else{
        return true;
    }
}

//covers query
var q = document.getElementById("query_search");
function getQuery(){
    console.log(q.value);
    finalSearch.query = q.value;

}


//covers submit
function advSubmit(){
    getQuery();
    var check = checkMinMax();

    if (check == false){
        console.log("***ERROR***");
        return false;
    }
    else{
        getAdvSearch(finalSearch);
        //return true;
    }
}


function getAdvSearch(finalSearch){
    console.log(finalSearch);
    $('html,body').animate({
        scrollTop: $("#searchResults").offset().top},
        'slow');


    console.log("**********************getAdvSearch");
    console.log($("#loading"));

    $.ajax({
        url: '/advancedsearch',
        type: 'PUT',
        data: finalSearch,
        beforeSend: function(){
             $('.result-container').hide();
            $("#loading").show();
        },
        success: function(result, textStatus, xhr){
            $("#loading").hide();

            $('html,body').animate({
            scrollTop: $("#searchResults").offset().top},
            'slow');
            $('#searchResults').html(result);    
            $('.result-container').show();        
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            window.location.replace("/error/api");
        } 
    })
};

function getPage(num , type){
    console.log("IN GET PAGE");
    console.log(num);
    console.log(type);

    $('html,body').animate({
        scrollTop: $("#searchResults").offset().top},
        'slow');

    console.log("**********************getPage");
    console.log($("#loading"));

    

    $.ajax({
        url: '/advancedsearch?page=' + num,
        type: 'PUT',
        data: finalSearch,
        beforeSend: function(){
            $('.result-container').hide();
            $("#loading").show();

        },
        success: function(result){
            $("#loading").hide();
            $('.result-container').show();
            $('html,body').animate({
            scrollTop: $("#searchResults").offset().top},
            'slow');
            $('#searchResults').html(result);  
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            window.location.replace("/error/api");
        } 
    })
}



