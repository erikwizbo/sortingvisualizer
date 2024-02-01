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
    const actions = heapSort([...array]);
    animateHeapSort(actions, 0);
}

function animateHeapSort(actions, index) {
    if (index < actions.length) {
        const action = actions[index];

        if (action.type === 'compare') {
            showBars(action.state, action.indices, 'green');
        } else if (action.type === 'swap') {
            showBars(action.state, action.indices, 'red');
        }

        requestAnimationFrame(() => {
            setTimeout(() => {
                animateHeapSort(actions, index + 1);
            }, 50);
        });
    } else {
        highlightAllBarsGreen(actions[actions.length - 1].state);
    }
}

function heapSort(arr) {
    let actions = [];
    buildMaxHeap(arr, actions);
    let size = arr.length;
    
    for (let i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i, actions);
        size--;
        heapify(arr, 0, size, actions);
    }

    actions.push({ type: 'sorted', state: [...arr] });
    return actions;
}

function buildMaxHeap(arr, actions) {
    for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
        heapify(arr, i, arr.length, actions);
    }
}

function heapify(heap, i, size, actions) {
    let max = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < size && heap[left] > heap[max]) {
        max = left;
    }
    
    if (right < size && heap[right] > heap[max]) {
        max = right;
    }
    
    if (max !== i) {
        swap(heap, i, max, actions);
        heapify(heap, max, size, actions);
    }
}

function swap(arr, i, j, actions) {
    actions.push({ type: 'swap', indices: [i, j], state: [...arr] });
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
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
