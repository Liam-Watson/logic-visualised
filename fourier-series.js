

let elem = document.getElementById('draw-animation');
let screenWidth = window.screen.width;
let screenHeight = window.screen.height;
let params = {width: screenWidth, height: screenHeight};//width: 600, height: 600
let two = new Two(params).appendTo(elem);

let vectorSliderS = document.getElementById("vectorsSliderS");
let pauseButtonS= document.getElementById("dtPauseS");
let frameRateSliderS = document.getElementById("frameRateSliderS");

let number_of_vectors = 50;
let X = [];
let Y = [];

let status = 0;
let plotX = [];

let t = 0;
let frameCount = 15;
let fourierX = discreteFourierTransform(X);
let fourierY = discreteFourierTransform(Y);

fourierX.sort((a, b) => b.amp - a.amp);
fourierY.sort((a, b) => b.amp - a.amp);

let dt = (2*Math.PI)/fourierY.length;
vectorSliderS.max = fourierX.length;
vectorSliderS.oninput = function(){
    number_of_vectors = this.value;
}

pauseButtonS.onclick = function(){
    if(dt === 0){
        dt = (2*Math.PI)/fourierY.length;;
    }else{
        dt = 0;
    }
}
let updateInterval = setInterval(function() {
    two.update();
}, 1000000);
frameRateSliderS.oninput = function(){
    frameCount = 1/(this.value/1000);
    clearInterval(updateInterval);
    updateInterval = setInterval(function() {
        two.update();
    }, frameCount);
}
function resetVrbls(){
    t = 0;
    X = [];
    Y = [];
    plotX = [];
    fourierY = [];
    fourierX = [];

}
function setUp(){
    fourierX = discreteFourierTransform(X);
    fourierY = discreteFourierTransform(Y);
    fourierX.sort((a, b) => b.amp - a.amp);
    fourierY.sort((a, b) => b.amp - a.amp);
    dt = (2*Math.PI)/fourierY.length;
    vectorSliderS.max = fourierX.length;
    clearInterval(updateInterval);
    updateInterval = setInterval(function() {
        two.update();
    }, frameCount);
}

const FOURIER_PORTRAIT = document.getElementById("fourier-portrait");
FOURIER_PORTRAIT.addEventListener("click", function(){
    status = 1;
    resetVrbls();
    //Fourier Portrait
    number_of_vectors = 50;
    for (let i = 0; i < fData.length; i += 1) {
        X.push(-fData[i].x/2.5 + window.screen.width/3.5);
        Y.push(fData[i].y/2.5 - window.screen.height/3);
    }
    setUp();
});
const PI = document.getElementById("pi");
PI.addEventListener("click", function(){
    status = 2;
    resetVrbls();
    //PI
    number_of_vectors = 50;
    for (let i = 0; i < pi.length; i += 1) {
        X.push(-1*pi[i].x);
        Y.push(-1*pi[i].y);
    }
    setUp();
});
const RANDOM_NOISE = document.getElementById("random-noise");
RANDOM_NOISE.addEventListener("click", function(){
    status = 3;
    resetVrbls();
    //random
    number_of_vectors = 50;
    for(let i = 0; i < number_of_vectors; i++){
        X.push(Math.random()*400 - 200);
    }
    for(let i = 0; i < number_of_vectors; i++){
        Y.push(Math.random()*400 - 200);
    }
    setUp();
});
const CIRCLE = document.getElementById("circle");
CIRCLE.addEventListener("click", function(){
    status = 4;
    let angle;
    resetVrbls();
    //circle
    number_of_vectors = 50;
    for(let p = 0; p < number_of_vectors; p++){
        angle = map_range(p,0,50,0,2*Math.PI)
        X.push(50*Math.cos(angle));
    }

    for(let p = 0; p < number_of_vectors; p++){
        angle = map_range(p,0,50,0,2*Math.PI)
        Y.push(50*Math.sin(angle));;
    }
    setUp();
});
const CODING_TRAIN = document.getElementById("coding-train");
CODING_TRAIN.addEventListener("click", function(){
    status = 5;
    resetVrbls();
    //Coding Train
    for (let i = 0; i < drawing.length; i += 10) {
        X.push(drawing[i].x);
        Y.push(drawing[i].y);
    }
    setUp();
});

// setInterval(function() {
//     two.update();
// }, frameCount);
two.bind('update', function() {
    two.clear();

    let x = 0;
    let y = 0;


    let VX = drawCircles(x, y, Math.PI / 2, fourierX);
    let VY = drawCircles(x, y, 0, fourierY);

    let connecting_lineX = two.makeLine(VX.x, VX.y - two.height / 2 + 50, VX.x, VY.y);
    let connecting_lineY = two.makeLine(VY.x - two.width / 2 + 100, VY.y, VX.x, VY.y);

    connecting_lineX.stroke = "#FFF";
    connecting_lineY.stroke = "#FFF"

    connecting_lineX.translation.set(two.width / 2, two.height / 2);
    connecting_lineY.translation.set(two.width / 2, two.height / 2);

    let pointY = new Two.Anchor();
    pointY.x = VX.x;
    pointY.y = VY.y;
    pointY.command = Two.Commands.curve;

    if(dt != 0){
        plotX.unshift(pointY);
    }

    if (plotX.length > fourierX.length+1 && dt != 0) {
        plotX.pop();
    }
    let curveX = new Two.Path(plotX, false, false, false);
    curveX.linewidth = 1;
    curveX.noFill();
    curveX.stroke = '#FFF';
    curveX.translation.set((two.width / 2), two.height / 2);
    two.add(curveX);

    t += dt;
    if (t > 2 * Math.PI) {
        t = 0;
    }

});



function drawCircles(x, y,rot, fourier){
    for(let i =0; i < number_of_vectors; i++) {
        let xPrev = x;
        let yPrev = y;

        let frequency = fourier[i].freq;
        let r = fourier[i].amp;
        let phase = fourier[i].phase;

        x += r * Math.cos(frequency*t + phase + rot);
        y += r * Math.sin(frequency*t +phase + rot);

        let line = two.makeLine(xPrev, yPrev,  x,  y);
        line.stroke = '#FFF';
        line.linewidth = 1;
        line.opacity = 0.8;

        if(rot === Math.PI/2){
            line.translation.set(two.width/2, 50);

            let circle = two.makeCircle(two.width/2 + xPrev, 50+yPrev, r);
            circle.noFill();
            circle.stroke = '#FFF';
            circle.linewidth = 0.5;
            circle.opacity = 0.7;
        }else{
            line.translation.set(100, two.height/2);
            let circle = two.makeCircle(100 + xPrev, two.height/2 + yPrev, r);
            circle.noFill();
            circle.stroke = '#FFF';
            circle.linewidth = 0.5;
            circle.opacity = 0.7;
        }
    }
    let point = new Two.Anchor();
    point.x = x;
    point.y = y;
    point.command = Two.Commands.curve;
    return point;
}

function discreteFourierTransform(x){
    let X = [];
    const N = x.length;
    for(let i = 0; i < N; i++){
        let re = 0;
        let im = 0;
        for(let j = 0 ; j < N; j++){
            const theta = (2*Math.PI*i*j)/N;
            re += x[j]*Math.cos(theta);
            im -= x[j]*Math.sin(theta);
        }
        re = re/N;
        im = im/N;
        let freq = i;
        let amp = Math.sqrt(re*re + im*im);
        let phase = Math.atan2(re,im);
        X[i] = {re,im,freq, amp, phase};
    }
    return X;
}
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}





