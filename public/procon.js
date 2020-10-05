function proConList(o){

    var items = document.getElementsByClassName("pro-con-item");
    var i;
    for (i = 0; i < o.length ; i++){
        console.log(i);
        var image = document.createElement('div');
        if (o[i] == false){
            image.classList.add("image-con-item");
            items[i].appendChild(image);
        }
        else{
            image.classList.add("image-pro-item");
            items[i].appendChild(image);
        }
    }
};


