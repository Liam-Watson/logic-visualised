const mergeSortButton = document.getElementById("mergeSortButton");

mergeSortButton.addEventListener("click", mergeSetup);

function mergeSetup() {
    reset();
    clearAllIntervals();
    removeAllListeners();
    generateArrayValues();
    sliderContainer.style.display = "block";
    startButton.addEventListener("click",mergeSortListener);
}

function halfArrBottom(arr){
    return arr.slice(0, Math.floor(arr.length/2));
}
function halfArrTop(arr){
    return arr.slice(Math.floor(arr.length/2)+1);
}


function mergeSortListener(){
    console.log(arry);
    let tmp = [arry,halfArrBottom(arry),halfArrTop(arry),
        halfArrBottom(halfArrBottom(arry)),halfArrTop(halfArrBottom(arry)),halfArrBottom(halfArrTop(arry)),halfArrTop(halfArrTop(arry)),
        halfArrBottom(halfArrBottom(halfArrBottom(arry))),halfArrTop(halfArrBottom(halfArrBottom(arry))),halfArrBottom(halfArrTop(halfArrBottom(arry))),halfArrTop(halfArrTop(halfArrBottom(arry))),halfArrBottom(halfArrBottom(halfArrTop(arry))),halfArrTop(halfArrBottom(halfArrTop(arry))),halfArrBottom(halfArrTop(halfArrTop(arry))),halfArrTop(halfArrTop(halfArrTop(arry)))];
    let arrySdin = [...tmp];
    for(let c = 0; c < tmp.length; c++){
        arrySdin[c] = [...tmp[c]];
        console.log(arrySdin[c]);
        tmp[c] = mergeSort(tmp[c]);
    }
    reallySlowJankyRender(arrySdin, tmp);
}

function mergeSort(arr){
        if(arr.length < 2){
            return arr;
        }else{
            let middle = Math.floor((arr.length)/2);
            let left = arr.slice(0,middle);
            let right = arr.slice(middle, arr.length);
            return merge(mergeSort(left), mergeSort(right));
        }

}

function merge(lft, rgt){
    let merg = [];
    let counter = 0;
    let endPos = arry.indexOf(rgt[rgt.length-1]);
    let beginPos = arry.indexOf(lft[0]);
    if(lft.length && rgt.length){
        let endPos = arry.indexOf(rgt[rgt.length-1]);
        let begin = arry.indexOf(lft[0]);
    }else{
        let endPos = 0;
        let beginPos = 0;
        counter = 100000;
    }
    let subset = [];
    while(lft.length && rgt.length){
        if(lft[0]<rgt[0]){
            merg.push(lft[0]);
            lft = lft.slice(1);
        }else{
            merg.push(rgt[0]);
            rgt = rgt.slice(1);
        }
    }
    while (lft.length){
        merg.push(lft.shift());
    }

    while (rgt.length){
        merg.push(rgt.shift());
    }

    subset = merg;
    while((counter+beginPos)<=endPos){
        arry[counter+beginPos] = subset[counter];
        counter++;
    }
    return merg;
}

function reallySlowJankyRender(arrySdin, tmp){
    console.log(arrySdin);
    setTimeout(function () {
        arry = arrySdin[0];
        console.log(arrySdin[0]);
        rerender("#000");
    },0)
    setTimeout(function () {
        arry = tmp[7].concat(arrySdin[8] ,arrySdin[9], arrySdin[10], arrySdin[11], arrySdin[12], arrySdin[13], arrySdin[14]);
        rerender("#000");
    },1000)
    setTimeout(function () {
        arry = tmp[7].concat(tmp[8] ,arrySdin[9], arrySdin[10], arrySdin[11], arrySdin[12], arrySdin[13], arrySdin[14]);
        rerender("#000");
    },2000)
    setTimeout(function () {
        arry = tmp[3].concat(arrySdin[9], arrySdin[10], arrySdin[11], arrySdin[12], arrySdin[13], arrySdin[14]);
        rerender("#000");
    },3000)
    setTimeout(function () {
        arry = tmp[3].concat(tmp[9], arrySdin[10], arrySdin[11], arrySdin[12],arrySdin[13], arrySdin[14]);
        rerender("#000");
    },4000)
    setTimeout(function () {
        arry = tmp[3].concat(tmp[9],tmp[10], arrySdin[11], arrySdin[12], arrySdin[13], arrySdin[14]);
        rerender("#000");
    },5000)
    setTimeout(function () {
        arry = tmp[3].concat(tmp[4], arrySdin[11],arrySdin[12], arrySdin[13], arrySdin[14]);
        rerender("#000");
    },6000)
    setTimeout(function () {
        arry = tmp[1].concat(arrySdin[2]);
        rerender("#000");
    },7000)
    setTimeout(function () {
        arry = tmp[1].concat(tmp[11],arrySdin[12], arrySdin[13], arrySdin[14]);
        rerender("#000");
    },8000)
    setTimeout(function () {
        arry = tmp[1].concat(tmp[11],tmp[12],arrySdin[13], arrySdin[14]);
        rerender("#000");
    },9000)
    setTimeout(function () {
        arry = tmp[1].concat(tmp[5],arrySdin[13],arrySdin[14]);
        rerender("#000");
    },10000)
    setTimeout(function () {
        arry = tmp[1].concat(tmp[5], tmp[13], arrySdin[14]);
        rerender("#000");
    },11000)
    setTimeout(function () {
        arry = tmp[1].concat(tmp[5], tmp[13], tmp[14]);
        rerender("#000");
    },12000)
    setTimeout(function () {
        arry = tmp[1].concat(tmp[5],tmp[6]);
        rerender("#000");
    },13000)
    setTimeout(function () {
        arry = tmp[1].concat(tmp[2]);
        rerender("#000");
    },14000)
    setTimeout(function () {
        arry = tmp[0];
        rerender("#13e600");
    },15000)
}