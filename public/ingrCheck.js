
var total = document.getElementById('total-price');
total.textContent = parseFloat(total.textContent).toFixed(2);
var total_Int = total.textContent;

function removeIngr(price, elem){
    var row = elem.parentElement.parentElement;

    var r = row.classList.toggle('removeIngr');

    if (r){
        total_Int = parseFloat(total_Int) - parseFloat(price);
    }
    else{
        total_Int = parseFloat(total_Int) + parseFloat(price);
        
    }

    var fin_total = parseFloat(total_Int).toFixed(2);

    $('#total-price').html(fin_total);   
};