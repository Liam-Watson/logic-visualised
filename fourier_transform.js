let state = 0;

let vectorSlider = document.getElementById("vectorsSlider");
let dtSlider = document.getElementById("dtSlider");
let frameRateSlider = document.getElementById("frameRateSlider");



let t = 0;
let dt = 0.01;

let frameCount = 15;

let plot = [new Two.Anchor(0, 0, Two.Commands.curve)];

let elem = document.getElementById('draw-animation');
let screenWidth = window.screen.width;
let screenHeight = window.screen.height;
let params = {width: screenWidth, height: screenHeight-50};

let two = new Two(params).appendTo(elem);
let xOrigin = two.width/2;
let yOrigin = two.height/2;

let numberOfVectors = 10;
vectorSlider.oninput = function(){
    numberOfVectors = this.value;
}
dtSlider.oninput = function(){
    dt = this.value/100;
}
frameRateSlider.oninput = function(){
    frameCount = 1/(this.value/1000);
    clearInterval(updateInterval);
    updateInterval = setInterval(function() {
        two.update();
    }, frameCount);
}
let updateInterval = setInterval(function() {
    two.update();
}, 1000000);


const SAW_TOOTH = document.getElementById("saw-tooth");
SAW_TOOTH.addEventListener("click", function(){
    state = 1;
    plot = [];
    frameCount = 10;
    dt = 0.1;
    clearInterval(updateInterval);
    updateInterval = setInterval(function() {
        two.update();
    }, frameCount);

});
const SQUARE_WAVE = document.getElementById("square-wave");
SQUARE_WAVE.addEventListener("click", function(){
    state = 2;
    plot = [];
    frameCount = 10;
    dt = 0.03;
    clearInterval(updateInterval);
    updateInterval = setInterval(function() {
        two.update();
    }, frameCount);

});
const SINE_WAVE = document.getElementById("sine-wave");
SINE_WAVE.addEventListener("click", function(){
    state = 3;
    plot = [];
    dt = 0.03;
    frameCount = 15;
    clearInterval(updateInterval);
    updateInterval = setInterval(function() {
        two.update();
    }, frameCount);
});
const RANDOM_WAVE = document.getElementById("random-wave");
RANDOM_WAVE.addEventListener("click", function(){
    state = 4;
    dt = 0.1;
    plot = [];
    frameCount = 10;
    clearInterval(updateInterval);
    updateInterval = setInterval(function() {
        two.update();
    }, frameCount);

});
const TRIANGLE_WAVE = document.getElementById("triangle-wave");
TRIANGLE_WAVE.addEventListener("click", function(){
    state = 5;
    dt = 0.03;
    plot = [];
    frameCount = 10;
    clearInterval(updateInterval);
    updateInterval = setInterval(function() {
        two.update();
    }, frameCount);

});
two.bind('update', function() {
    two.clear();

    let x = 0;
    let y = 0;
    let V = {x,y};
    if(state ===0){
        V = {};
        plot = [];
    }else if(state === 1){
        V = sawTooth();
    }else if(state=== 2){
        V = squareWave();
    }else if(state === 3){
        V = sineWave();
    }else if(state === 4){
        // V = randomNoise();
        V=parabolic();
    }else if(state === 5){
        V = triangleWave();
    }
    x = V.x;
    y = V.y;
    let point = new Two.Anchor();
    point.x = 0;
    point.y = y;
    point.command = Two.Commands.curve;
    for (let j = 0; j < plot.length; j++) {
        plot[j].x = plot[j].x + dt * 20;
    }
    if(dt != 0){
        plot.unshift(point);
    }
    if (plot.length > 300 && dt != 0.00) {
        plot.pop();
    }


    let connecting_line = two.makeLine( x,  y, 200, y);
    connecting_line.stroke = "#FFF";
    connecting_line.translation.set(two.width/2, two.height/2);

    let curve = new Two.Path(plot, false, false, false);
    curve.linewidth = 1;

    curve.noFill();
    curve.stroke = '#FFF';
    curve.translation.set((two.width/2)+200, two.height/2);
    two.add(curve);
    t+=dt;
    // if (t > 2 * Math.PI && state != 3) {
    //     t = 0;
    // }
    if (t > 2 * Math.PI) {
        t = 0;
    }
    // if(t > Math.PI && state === 3){
    //     t = -Math.PI;
    // }
});
function sineWave() {
    let x = 0;
    let y = 0;
    let n = 2 * 1 + 1;
    let xPrev = x;
    let yPrev = y;
    let r = 300 * (4 / (n * Math.PI));

     x += r * Math.cos(n*t);
     y += r * Math.sin(n*t);
    drawCircle(x,y,xPrev,yPrev,r);
    let V = {x,y}
    return V;
}
function sawTooth() {
    let x = 0;
    let y = 0;
    for(let i =1; i < numberOfVectors; i++) {
        let xPrev = x;
        let yPrev = y;

        let neg = Math.pow(-1,i);

        let r = 100 * (2 / (i* neg * Math.PI));

        x += r * Math.cos(i*t);
        y += r * Math.sin(i*t);

        drawCircle(x,y,xPrev,yPrev,r);

    }
    let V = {x,y}
    return V;
}
function randomNoise() {
    let x = 0;
    let y = 0;
    for(let i =1; i < numberOfVectors; i++) {
        let xPrev = x;
        let yPrev = y;
        let r = Math.random()*100 * (4 / ((i+1) * Math.PI));

        x += r * Math.cos(i*t);
        y += r * Math.sin(i*t);
        drawCircle(x,y,xPrev,yPrev,r);

    }
    let V = {x,y}
    return V;
}

function parabolic() {
    let x = 0;
    let y = 0;
    for(let i =1; i < numberOfVectors; i++) {
        let n = i;
        let xPrev = x;
        let yPrev = y;
        let r = Math.pow(-1,i)*30 * (4 / (n*n));
        x += r * Math.sin(n*t);
        y -= r * Math.cos(n*t);

        drawCircle(x,y,xPrev,yPrev,r);

    }
    y+= (Math.PI * Math.PI)/3;
    let V = {x,y}
    return V;
}
function squareWave() {
    let x = 0;
    let y = 0;
    for(let i =0; i < numberOfVectors; i++) {
        let n = 2 * i + 1;
        let xPrev = x;
        let yPrev = y;
        let r = 80 * (4 / (n * Math.PI));

        x += r * Math.cos(n*t);
        y += r * Math.sin(n*t);

        drawCircle(x,y,xPrev,yPrev,r);

    }
    let V = {x,y}
    return V;
}

function triangleWave() {
    let x = 0;
    let y = 0;
    let l = Math.PI;
    for(let i =0; i < numberOfVectors; i++) {
        let n = 2 * i + 1;
        let xPrev = x;
        let yPrev = y;
        let r =  (8 / (Math.PI*Math.PI))*100*Math.pow(-1,((n-1)/2))/ (Math.pow(n,2));

        x += r * Math.cos((n*Math.PI*t)/l);
        y += r * Math.sin((n*Math.PI*t)/l);

        drawCircle(x,y,xPrev,yPrev,r);

    }
    // y = y;
    let V = {x,y}
    return V;
}

function drawCircle(x,y,xPrev,yPrev,r){
    let circle2 = two.makeCircle(xOrigin + xPrev, yOrigin + yPrev, r);
    circle2.noFill();
    circle2.stroke = '#FFF';
    circle2.linewidth = 0.3;
    let line = two.makeLine(xPrev, yPrev,  x,  y);
    line.stroke = '#FFF';
    line.linewidth = 1;
    line.translation.set(two.width/2, two.height/2);
}






