

let elem = document.getElementById('draw-animation');
let params = {fullscreen:true};//width: 600, height: 600
let two = new Two(params).appendTo(elem);


let number_of_vectors = 50;
let X = [];
let Y = [];
let skip = 8;
//Coding Train
// for (let i = 0; i < drawing.length; i += 20) {
//     X.push(drawing[i].x);
//     Y.push(drawing[i].y);
// }

//random
// for(let i = 0; i < number_of_vectors; i++){
//     X.push(Math.random()*300);
// }
// for(let i = 0; i < number_of_vectors; i++){
//     Y.push(Math.random()*300);
// }

//PI
for (let i = 0; i < pi.length; i += 1) {
    X.push(pi[i].x);
    Y.push(pi[i].y);
}

// let angle;
// //circle
// for(let p = 0; p < number_of_vectors; p++){
//     angle = map_range(p,0,50,0,2*Math.PI)
//     X.push(50*Math.cos(angle));
// }
//
// for(let p = 0; p < number_of_vectors; p++){
//     angle = map_range(p,0,50,0,2*Math.PI)
//     Y.push(50*Math.sin(angle));;
// }

let fourierX = discreteFourierTransform(X);
let fourierY = discreteFourierTransform(Y);

fourierX.sort((a, b) => b.amp - a.amp);
fourierY.sort((a, b) => b.amp - a.amp);

let plotX = [];

let t = 0;
let frameCount = 30;
const dt = (2*Math.PI)/fourierY.length;

setInterval(function() {
    two.update();
}, frameCount);
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
    plotX.unshift(pointY);

    if (plotX.length > 250) {
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
// }).play();
});



function drawCircles(x, y,rot, fourier){
    for(let i =0; i < fourier.length-1; i++) {
    // for(let i =0; i < 25; i++) {
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





