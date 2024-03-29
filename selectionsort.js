
//set length (comments can be the same as in script.js,)
//same layout only difference is the sort functions
let n = 15;
let array = [];
const container = document.getElementById('container');

function init() {
    array = [];
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    console.log('Array initialized:', array);
    showBars(array);
}

function play() {
    const actions = selectionSort([...array]);
    animateSelectionSort(actions, 0);
}

function animateSelectionSort(actions, index) {
    if (index < actions.length) {
        const action = actions[index];

        if (action.type === 'compare') {
            showBars(action.state, action.indices, 'green');
        } else if (action.type === 'swap') {
            showBars(action.state, action.indices, 'red');
        }

        requestAnimationFrame(() => {
            setTimeout(() => {
                animateSelectionSort(actions, index + 1);
            }, 100);
        });
    } else {
        highlightAllBarsGreen(actions[actions.length - 1].state);
    }
}

function selectionSort(arr) {
    let actions = [];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            actions.push({ type: 'compare', indices: [minIndex, j], state: [...arr] });
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            //swap the found minimum element with the first element
            let temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;

            actions.push({ type: 'swap', indices: [i, minIndex], state: [...arr] });
        }
    }

    //final state
    actions.push({ type: 'sorted', state: [...arr] });

    return actions;
}

function highlightAllBarsGreen(sortedArr) {
    let highlightedIndices = [];

    for (let i = 0; i < sortedArr.length; i++) {
        setTimeout(() => {
            highlightedIndices.push(i);
            //highlight all the bars that have been compared so far
            showBars(sortedArr, highlightedIndices, 'green');
        }, i * 100);
    }

    //after the last comparison, ensure the entire array is highlighted in green
    setTimeout(() => {
        showBars(sortedArr, sortedArr.map((_, idx) => idx), 'green');
    }, (sortedArr.length - 1) * 100);
}

function showBars(arr, highlightIndices = [], highlightColor = "") {
    //if the bars have not been created yet, create them.
    if (container.children.length === 0) {
        arr.forEach((value, index) => {
            const bar = document.createElement("div");
            bar.style.height = value * 200 + "px";
            bar.classList.add("bar");
            container.appendChild(bar);
        });
    }

    //update existing bars
    arr.forEach((value, index) => {
        const bar = container.children[index];
        bar.style.height = value * 200 + "px"; //update the height of the bar

        //reset the color of all bars
        bar.style.backgroundColor = '';

        //if the current bar is one of the bars to be highlighted, change its color
        if (highlightIndices.includes(index)) {
            bar.style.backgroundColor = highlightColor;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const initButton = document.getElementById('initButton');
    const playButton = document.getElementById('playButton');

    initButton.addEventListener('click', init);
    playButton.addEventListener('click', play);

    init();
});

