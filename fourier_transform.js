let t = 0;
let dt = 0.01;
// let r = 100;
let x0 = 0;
let y0 = 0;




let plot = [new Two.Anchor(0, 0, Two.Commands.curve)];
// Make an instance of two and place it on the page.
let elem = document.getElementById('draw-animation');
let params = {fullscreen:true};//width: 600, height: 600
let two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
let xOrigin = two.width/2;
let yOrigin = two.height/2;


function makePoint(x, y) {

    if (arguments.length <= 1) {
        y = x.y;
        x = x.x;
    }

    var v = new Two.Vector(x, y);
    v.position = new Two.Vector().copy(v);

    return v;

}

// Don't forget to tell two to render everything
// to the screen
two.bind('update', function(frameCount) {
    two.clear();

    let x = 0;
    let y = 0;
    // let circle = two.makeCircle(0, 0, r);
    // circle.fill = '#000';
    // circle.stroke = '#FFF'; // Accepts all valid css color
    // circle.linewidth = 2;
    // circle.translation.set(200, 400);

    for(let i =0; i < 10; i++) {
        let n = 2 * i + 1;
        let xPrev = x;
        let yPrev = y;
        let r = 50 * (4 / (n * Math.PI));

        x += r * Math.cos(n*t);
        y += r * Math.sin(n*t);


        let circle2 = two.makeCircle(xOrigin + xPrev, yOrigin + yPrev, r);
        circle2.noFill();
        // circle2.fill = '#000';
        circle2.stroke = '#FFF';
        circle2.linewidth = 0.3;



        let line = two.makeLine(xPrev, yPrev,  x,  y);
        line.stroke = '#FFF';
        line.linewidth = 1;


        line.translation.set(two.width/2, two.height/2);


    }
    let point = new Two.Anchor();
    point.x = 0;
    point.y = y;
    point.command = Two.Commands.curve;
    for (let j = 0; j < plot.length; j++) {
        plot[j].x = plot[j].x + dt * 10;
    }
    plot.unshift(point);
    if (plot.length > 250) {
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
}).play();







