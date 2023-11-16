const n = 15;
let array = [];

// Reference to the container
const container = document.getElementById('container');

// Generate an initial random array and display it as bars
function init() {
    array = []; // Reset the array
    for (let i = 0; i < n; i++) {
        array[i] = Math.random();
    }
    console.log('Array initialized:', array);
    showBars(array);
}

// This is your play function that initiates the sorting animation
function play() {
  const swaps = bubbleSort(array); // Get the swaps needed to sort the array
  animate(swaps, 0); // Start the animation with the first swap
}


// Animate the sorting process
function animate(swaps, index) {
  if (index < swaps.length) {
      const [i, j] = swaps[index];
      showBars(array, [i, j], 'green'); // Highlight bars to be compared
      
      setTimeout(() => {
          // Swap the bars
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
          
          showBars(array, [i, j], 'red'); // Highlight bars being swapped
          
          setTimeout(() => {
              showBars(array); // Show bars without highlights
              animate(swaps, index + 1); // Continue with the next swap
          }, 300); // Delay for showing the swap
      }, 300); // Delay for showing the comparison
  }
}

function bubbleSort(arr) {
    let swaps = [];
    let n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < n; i++) {
            // Compare the adjacent positions
            if (arr[i - 1] > arr[i]) {
                // Record the swap
                swaps.push([i - 1, i]);
                // Swap is needed, set swapped to true
                swapped = true;
            }
        }
        // After each pass, the largest element has bubbled up to the end,
        // so the length of the array that needs to be checked decreases by 1
        n--;
    } while (swapped); // Continue passes until no more swaps are needed
    return swaps;
}



// Modify the showBars function to accept indices and color for highlighting
function showBars(arr, highlightIndices = [], highlightColor = "") {
  container.innerHTML = ""; // Clear the container
  arr.forEach((value, index) => {
      const bar = document.createElement("div");
      bar.style.height = value * 200 + "px"; //scale the bar height
      bar.classList.add("bar");

      //if the current bar is one of the bars to be highlighted, change its color
      if (highlightIndices.includes(index)) {
          bar.style.backgroundColor = highlightColor;
      }

      container.appendChild(bar);
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
