const selectionSort = document.getElementById("selectionSortButton");



selectionSort.addEventListener("click", function () {
    reset();
    clearAllIntervals();
    removeAllListeners();
    generateArrayValues();
    sliderContainer.style.display = "block";
    startButton.addEventListener("click",selectionSortListener);
    resetButton.hidden = true;
});

function selectionSortListener(){
    startButton.hidden = true;
    resetButton.hidden = true;
    selectionSortInterval = setInterval(function () {
        if(p <= arry.length){
            if(q <= arry.length){
                if(arry[p]>arry[q]){
                    swap(p,q);
                    rerender("#000");
                }
                q++;
            }else{
                q = p+1;
                p++;
            }
        }else{
            rerender("#13e600");
            clearInterval(selectionSortInterval);
            p = 0;
            q = 0;
            startButton.hidden = true;
            resetButton.hidden = false;
        }
    },10)
}