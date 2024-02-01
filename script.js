let n = 15;
let array = [];

//reference to the container
const container = document.getElementById('container');

//generate an initial random array and display it as bars
function init() {
    array = []; //reset the array
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    console.log('Array initialized:', array);
    showBars(array);
}

function play() {
    const actions = bubbleSort([...array]); // Get the actions needed to sort the array
    animate(actions, 0); //start the animation with the first action
}

function animate(actions, index) {
    if (index < actions.length) {
      const action = actions[index];
  
      if (action.type === 'compare') {
        showBars(action.state, action.indices, 'green');
      } else if (action.type === 'swap') {
        showBars(action.state, action.indices, 'red');
      }
  
      //use requestAnimationFrame to call the next step of the animation
      requestAnimationFrame(() => {
        setTimeout(() => {
          animate(actions, index + 1);
        }, 50);
      });
    } else {
      //once all swaps and comparisons are done, we start the final pass
      highlightAllBarsGreen(actions[actions.length - 1].state);
    }
  }
  

//function to sequentially highlight each bar in green and keep it green once array is sorted
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

  
function bubbleSort(arr) {
    let actions = []; // To store actions (comparison and swap) and the state of the array
    let n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < n; i++) {
            //record the comparison using a copy of the array
            actions.push({ type: 'compare', indices: [i - 1, i], state: [...arr] });

            if (arr[i - 1] > arr[i]) {
                //swap the elements in the array
                let temp = arr[i - 1];
                arr[i - 1] = arr[i];
                arr[i] = temp;

                //record the swap
                actions.push({ type: 'swap', indices: [i - 1, i], state: [...arr] });
                swapped = true;
            }
        }
        n--;
    } while (swapped);

    //sorted state 
    actions.push({ type: 'sorted', state: [...arr] });

    return actions;
}


//modify the showBars function to update bars instead of recreating them
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


// Event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    const initButton = document.getElementById('initButton');
    const playButton = document.getElementById('playButton');

    initButton.addEventListener('click', init);
    playButton.addEventListener('click', play);

    init(); // Initialize the first set of bars
});


