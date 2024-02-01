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
    const actions = insertionSort([...array]);
    animateInsertionSort(actions, 0);
}

function animateInsertionSort(actions, index) {
    if (index < actions.length) {
        const action = actions[index];

        if (action.type === 'compare' || action.type === 'insert') {
            showBars(action.state, action.indices, action.type === 'compare' ? 'green' : 'red');
        }

        requestAnimationFrame(() => {
            setTimeout(() => {
                animateInsertionSort(actions, index + 1);
            }, 100);
        });
    } else {
        highlightAllBarsGreen(actions[actions.length - 1].state);
    }
}

function insertionSort(arr) {
    let actions = [];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        // Move elements of arr[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            actions.push({ type: 'compare', indices: [j, i], state: [...arr] });
            arr[j + 1] = arr[j];
            actions.push({ type: 'insert', indices: [j + 1, j], state: [...arr] });
            j = j - 1;
        }
        arr[j + 1] = key;
    }

    // Final state
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
    // If the bars have not been created yet, create them.
    if (container.children.length === 0) {
        arr.forEach((value, index) => {
            const bar = document.createElement("div");
            bar.style.height = value * 200 + "px";
            bar.classList.add("bar");
            container.appendChild(bar);
        });
    }

    // Update existing bars
    arr.forEach((value, index) => {
        const bar = container.children[index];
        bar.style.height = value * 200 + "px"; // update the height of the bar

        // Reset the color of all bars
        bar.style.backgroundColor = '';

        // If the current bar is one of the bars to be highlighted, change its color
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
