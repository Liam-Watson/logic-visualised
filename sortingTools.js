let arry = [];
let vectors;
let VECTORDIV = document.getElementById("vectorDIV");
const width = window.screen.width*0.95;
const height = window.screen.height*0.95;
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");


let bubbleSortInterval = null;
let selectionSortInterval = null;
let mergeSortInterval = null;

let p = 0;
let q = 0;

let sliderWight = 0.5;
let slider = document.getElementById("myRange");

const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg1.setAttribute ("width", width*(0.6)+"" );
svg1.setAttribute ("height", (height*0.6)+"" );
svg1.setAttribute("overflow", "visible");

let numLines = Math.floor((width*0.95)/10)*sliderWight;

function swap(i, j){
    let tmp = arry[i];
    arry[i] = arry[j];
    arry[j] = tmp;
}

function generateArrayValues(){
    clearLines();
    reset();
    let value = 0;
    arry.push(Math.floor(Math.random() * width * (0.3)));
    //for(let i = 0; i < numLines; i++){
    while(arry.length < numLines) {
        value = Math.floor(Math.random() * width * (0.3));
        if (arry.indexOf(value) === -1) {
            arry.push(value);
        }
    }

    rerender("#000");
}

function rerender(barColor){
    clearLines();
    for(let k = 0; k < arry.length; k++){
        //console.log(arry);
        let value=arry[k];
        let line1 = document.createElementNS("http://www.w3.org/2000/svg","line");
        line1.setAttribute("x1", ""+k*(width*0.95)/numLines);
        line1.setAttribute("y1",""+0);
        line1.setAttribute("y2",""+(value));
        line1.setAttribute("x2",""+k*(width*0.95)/numLines);
        line1.style.paddingRight = "100px";
        line1.style.strokeWidth = ((width*0.95)/numLines)/2  +"px";
        line1.style.stroke = barColor;
        svg1.appendChild(line1)
        VECTORDIV.appendChild(svg1);
    }
}

slider.oninput = function() {
    sliderWight = this.value/100.0;
    resetButton.hidden = true;
    numLines = Math.floor(((width*0.95)*sliderWight)/10);
    startButton.hidden = false;
    clearInterval(bubbleSortInterval);
    clearInterval(selectionSortInterval);
    clearInterval(mergeSortInterval);
    generateArrayValues();
}

function removeAllListeners(){
    startButton.removeEventListener("click", bubbleSortListener);
    startButton.removeEventListener("click", selectionSortListener);
    startButton.removeEventListener("click", mergeSortListener);
    // startButton.removeEventListener("click", bubbleSortListener);
}
function clearAllIntervals(){
    clearInterval(selectionSortInterval);
    clearInterval(bubbleSortInterval);
}

function reset(){
    p = 0;
    q = 0;
    arry.length = 0;
}

function clearLines(){
    while(svg1.lastChild){
        svg1.removeChild(svg1.lastChild);
    }
}

function rerenderArray(barColor, arr){

    for(let k = 0; k < arry.length; k++){
        let value=arry[k];
        let line1 = document.createElementNS("http://www.w3.org/2000/svg","line");
        line1.setAttribute("x1", ""+k*(width*0.95)/numLines);
        line1.setAttribute("y1",""+0);
        line1.setAttribute("y2",""+(value));
        line1.setAttribute("x2",""+k*(width*0.95)/numLines);
        line1.style.paddingRight = "100px";
        line1.style.strokeWidth = ((width*0.95)/numLines)/2  +"px";
        line1.style.stroke = barColor;
        svg1.appendChild(line1)
        VECTORDIV.appendChild(svg1);
    }
}
resetButton.addEventListener("click", resetArray);
function resetArray() {
    console.log("HER");
    reset();
    generateArrayValues();
    rerenderArray("#000");
    startButton.hidden = false;
    resetButton.hidden = true;
}