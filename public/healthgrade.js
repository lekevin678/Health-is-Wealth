var Dial = function(container) {
    this.container = container;
    this.size = this.container.dataset.size;
    this.strokeWidth = this.size / 8;
    this.radius = (this.size / 2) - (this.strokeWidth / 2);

    if (this.container.dataset.value >= 0){
        this.value = this.container.dataset.value;
        this.na = false;
    }
    else{
        this.value = 0;
        this.na = true;
    }

    
    this.direction = this.container.dataset.arrow;
    this.svg;
    this.defs;
    this.slice;
    this.overlay;
    this.text;
    this.arrow;
    this.create();
}

Dial.prototype.create = function() {
    this.createSvg();
    this.createDefs();
    this.createSlice();
    this.createOverlay();
    this.createText();
    this.createArrow();
    this.container.appendChild(this.svg);
};

Dial.prototype.createSvg = function() {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', this.size + 'px');
    svg.setAttribute('height', this.size + 'px');
    this.svg = svg;
};

Dial.prototype.createDefs = function() {
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradient.setAttribute('id', 'gradient' + this.value);

    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");


    if (this.value >= 75){
        stop1.setAttribute('stop-color', '#2de051'); 
        stop1.setAttribute('offset', '0%');
        linearGradient.appendChild(stop1);

        stop2.setAttribute('stop-color', '#35853d'); // fill color
        stop2.setAttribute('offset', '100%');
        linearGradient.appendChild(stop2);
    }

    else if (this.value < 75 && this.value >= 50){
        stop1.setAttribute('stop-color', '#f2ec41'); // fill color
        stop1.setAttribute('offset', '0%');
        linearGradient.appendChild(stop1);

        stop2.setAttribute('stop-color', '#e0da2d'); // fill color
        stop2.setAttribute('offset', '100%');
        linearGradient.appendChild(stop2);
    }

    else if (this.value < 50 && this.value >= 25){
        stop1.setAttribute('stop-color', '#f28622'); // fill color
        stop1.setAttribute('offset', '0%');
        linearGradient.appendChild(stop1);

        stop2.setAttribute('stop-color', '#ed994c'); // fill color
        stop2.setAttribute('offset', '100%');
        linearGradient.appendChild(stop2);
    }

    else {
        stop1.setAttribute('stop-color', '#ff2e2e'); // fill color
        stop1.setAttribute('offset', '0%');
        linearGradient.appendChild(stop1);

        stop2.setAttribute('stop-color', '#bf1717'); // fill color
        stop2.setAttribute('offset', '100%');
        linearGradient.appendChild(stop2);
    }

    //background
    var linearGradientBackground = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    linearGradientBackground.setAttribute('id', 'gradient-background');
    var back1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    //background color
    back1.setAttribute('stop-color', 'rgba(0, 0, 0, 0.2)');
    back1.setAttribute('offset', '0%');
    linearGradientBackground.appendChild(back1);
    var back2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    //background color
    back2.setAttribute('stop-color', 'rgba(0, 0, 0, 0.05)');
    back2.setAttribute('offset', '100%');
    linearGradientBackground.appendChild(back2);
    defs.appendChild(linearGradient);
    defs.appendChild(linearGradientBackground);
    this.svg.appendChild(defs);
    this.defs = defs;
};

Dial.prototype.createSlice = function() {
    var slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
    slice.setAttribute('fill', 'none');
    slice.setAttribute('stroke', 'url(#gradient' + this.value + ')');
    slice.setAttribute('stroke-width', this.strokeWidth);
    slice.setAttribute('transform', 'translate(' + this.strokeWidth / 2 + ',' + this.strokeWidth / 2 + ')');
    slice.setAttribute('class', 'animate-draw');
    this.svg.appendChild(slice);
    this.slice = slice;
};

Dial.prototype.createOverlay = function() {
    var r = this.size - (this.size / 2) - this.strokeWidth / 2;
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', this.size / 2);
    circle.setAttribute('cy', this.size / 2);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'url(#gradient-background)');
    this.svg.appendChild(circle);
    this.overlay = circle;
};

Dial.prototype.createText = function() {
    //text
    var fontSize = this.size / 3.5;
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', (this.size / 2) + fontSize / 7.5);
    text.setAttribute('y', (this.size / 2) + fontSize / 4);
    text.setAttribute('font-family', 'Century Gothic, Lato');
    text.setAttribute('font-size', fontSize);
    //text color

    if (this.value >= 75){
        text.setAttribute('fill', '#35853d');
    }

    else if (this.value < 75 && this.value >= 50){
        text.setAttribute('fill', '#e0da2d');
    }

    else if (this.value < 50 && this.value >= 25){
        text.setAttribute('fill', '#f28622');
    }

    else {
        text.setAttribute('fill', '#ff2e2e');
    }

    text.setAttribute('text-anchor', 'middle');
    var tspanSize = fontSize / 3;
    if (this.na == false){
        text.innerHTML = 0 + '<tspan font-size="' + tspanSize + '" dy="' + -tspanSize * 1.2 + '">%</tspan>';
    }
    else{
        text.innerHTML = 'N/A';
    }
    this.svg.appendChild(text);
    this.text = text;
};

Dial.prototype.createArrow = function() {
    var arrowSize = this.size / 10;
    var arrowYOffset, m;
    if(this.direction === 'up') {
        arrowYOffset = arrowSize / 2;
        m = -1;
    }
    else if(this.direction === 'down') {
        arrowYOffset = 0;
        m = 1;
    }
    var arrowPosX = ((this.size / 2) - arrowSize / 2);
    var arrowPosY = (this.size - this.size / 3) + arrowYOffset;
    var arrowDOffset =  m * (arrowSize / 1.5);
    var arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrow.setAttribute('d', 'M 0 0 ' + arrowSize + ' 0 ' + arrowSize / 2 + ' ' + arrowDOffset + ' 0 0 Z');
    arrow.setAttribute('fill', '#97F8F0');
    arrow.setAttribute('opacity', '0.6');
    arrow.setAttribute('transform', 'translate(' + arrowPosX + ',' + arrowPosY + ')');
    this.svg.appendChild(arrow);
    this.arrow = arrow;
};

Dial.prototype.animateStart = function() {
    var v = 0;
    var self = this;
    if (self.na == false){
        var intervalOne = setInterval(function() {
            var p = +(v / self.value).toFixed(2);
            var a = (p < 0.95) ? 2 - (2 * p) : 0.05;
            v += a;
            if(v >= +self.value) {
                v = self.value;
                clearInterval(intervalOne);
            }
            self.setValue(v);
        }, 5);
    }
};

Dial.prototype.animateReset = function() {
    this.setValue(0);
};

Dial.prototype.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

Dial.prototype.describeArc = function(x, y, radius, startAngle, endAngle){
    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;       
}

Dial.prototype.setValue = function(value) { 
        var c = (value / 100) * 360;
        if(c === 360)
            c = 359.99;
        var xy = this.size / 2 - this.strokeWidth / 2;
        var d = this.describeArc(xy, xy, xy, 180, 180 + c);
    this.slice.setAttribute('d', d);
    var tspanSize = (this.size / 3.5) / 3;
    this.text.innerHTML = Math.floor(value) + '<tspan font-size="' + tspanSize + '" dy="' + -tspanSize * 1.2 + '">%</tspan>';
};

var containers = document.getElementsByClassName("chart");
for (var i =0 ; i < containers.length; i++){
    var dial = new Dial(containers[i]);
    dial.animateStart();
}
