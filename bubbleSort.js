const bubbleSortButton = document.getElementById("bubbleSortButton");

bubbleSortButton.addEventListener("click", bubbleSortSetup);

function bubbleSortSetup(){
    reset();
    clearAllIntervals();
    removeAllListeners();
    generateArrayValues();
    sliderContainer.style.display = "block";
    startButton.addEventListener("click",bubbleSortListener);
}

function bubbleSortListener(){
    bubbleSortInterval = setInterval(function () {
        if(p <= arry.length){
            if(q <= arry.length){
                if(arry[p]<arry[q]){
                    swap(p,q);
                    rerender("#000");
                }
                q++;
            }else{
                q = 0;
                p++;
            }
        }else{
            rerender("#13e600");
            clearInterval(bubbleSortInterval);
            p = 0;
            q = 0;
        }
    },10)
}







