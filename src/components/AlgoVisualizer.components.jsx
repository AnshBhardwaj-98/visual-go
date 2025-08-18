import React, { Component } from "react";
import * as SortingAlgorithms from "../Algorithms/Sorting";

export default class AlgoVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      selectedAlgo: "",
      sliderValue: 300,
      speedValue: 15,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray = () => {
    const array = [];
    let n = this.state.sliderValue;
    for (let i = 0; i < n; i++) {
      array.push(this.randomValue(5, 500));
    }
    this.setState({ array });
  };

  randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  handleSliderChange = (event) => {
    this.setState({ sliderValue: event.target.value });
    this.resetArray;
  };
  handleSpeedChange = (event) => {
    this.setState({ speedValue: event.target.value });
    this.resetArray;
  };

  handelAnimation = (x) => {
    const len = x.length;
    for (let i = 0; i < len; i++) {
      const { comparison, swap } = x[i];

      setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");

        if (
          comparison &&
          comparison.length === 2 &&
          arrayBars[comparison[0]] &&
          arrayBars[comparison[1]]
        ) {
          arrayBars[comparison[0]].style.backgroundColor = "red";
          arrayBars[comparison[1]].style.backgroundColor = "red";

          if (swap && swap.length === 2) {
            const a = arrayBars[comparison[0]].style.height;
            const b = arrayBars[comparison[1]].style.height;

            arrayBars[comparison[0]].style.height = b;
            arrayBars[comparison[1]].style.height = a;
          }
        }

        setTimeout(() => {
          arrayBars[comparison[0]].style.backgroundColor = "white";
          arrayBars[comparison[1]].style.backgroundColor = "white";
        }, this.state.speedValue);
      }, i * this.state.speedValue);
    }
  };

  handelAnimationQuickSort = (x) => {
    const len = x.length;
    for (let i = 0; i < len; i++) {
      const { comparison, swap, pivot } = x[i];

      setTimeout(() => {
        const arrayBars = document.getElementsByClassName("array-bar");

        if (
          comparison &&
          comparison.length === 2 &&
          arrayBars[comparison[0]] &&
          arrayBars[comparison[1]]
        ) {
          arrayBars[comparison[0]].style.backgroundColor = "red";
          arrayBars[comparison[1]].style.backgroundColor = "red";
          arrayBars[pivot].style.backgroundColor = "blue";

          if (swap && swap.length === 2) {
            const a = arrayBars[comparison[0]].style.height;
            const b = arrayBars[comparison[1]].style.height;

            arrayBars[comparison[0]].style.height = b;
            arrayBars[comparison[1]].style.height = a;
          }
        }

        setTimeout(() => {
          arrayBars[comparison[0]].style.backgroundColor = "white";
          arrayBars[comparison[1]].style.backgroundColor = "white";
          arrayBars[pivot].style.backgroundColor = "white";
        }, this.state.speedValue);
      }, i * this.state.speedValue);
    }
  };

  handleMergeSortAnimation = (x) => {
    const arrayBars = document.getElementsByClassName("array-bar");

    x.forEach((step, i) => {
      setTimeout(() => {
        // Comparison highlight
        if (step.comparison && step.comparison.length === 2) {
          const [a, b] = step.comparison;

          if (arrayBars[a] && arrayBars[b]) {
            arrayBars[a].style.backgroundColor = "red";
            arrayBars[b].style.backgroundColor = "red";
          }
          setTimeout(() => {
            arrayBars[a].style.backgroundColor = "white";
            arrayBars[b].style.backgroundColor = "white";
          }, this.state.speedValue * 2);
        }

        //Overwrite event
        if (step.overwrite) {
          const { index, newHeight } = step.overwrite;
          if (arrayBars[index]) {
            arrayBars[index].style.height = `${newHeight}px`;
            arrayBars[index].style.backgroundColor = "green";
            setTimeout(() => {
              arrayBars[index].style.backgroundColor = "white";
            }, this.state.speedValue * 0.5);
          }
        }
      }, i * this.state.speedValue);
    });
  };

  handleAlgorithm = () => {
    let algo = this.state.selectedAlgo;

    switch (algo) {
      case "bubble":
        const newArr = SortingAlgorithms.bubbleSort(this.state.array);
        this.handelAnimation(newArr);
        break;

      case "insertion":
        const newArrInsertion = SortingAlgorithms.insertionSort(
          this.state.array
        );

        this.handelAnimation(newArrInsertion);
        break;

      case "selection":
        const newArrSelection = SortingAlgorithms.selectionSort(
          this.state.array
        );
        this.handelAnimation(newArrSelection);
        break;

      case "merge":
        const newArrMerge = SortingAlgorithms.mergeSort(this.state.array);
        this.handleMergeSortAnimation(newArrMerge);
        break;

      case "quick":
        const newArrQuick = SortingAlgorithms.callQuickSort(this.state.array);
        this.handelAnimationQuickSort(newArrQuick);

        break;

      case "heap":
        const newArrHeap = SortingAlgorithms.callHeapSort(this.state.array);
        this.handelAnimation(newArrHeap);
        break;

      default:
        break;
    }
  };
  render() {
    const { array } = this.state;
    return (
      <div className="flex flex-col size-full absolute bottom-0 items-center justify-end">
        {/* array lines */}
        <div className="flex items-end h-full gap-[1px] px-2 rounded ">
          {array.map((value, index) => (
            <div
              key={index}
              className="w-1 bg-white array-bar"
              style={{
                height: `${value}px`,
              }}
            />
          ))}
        </div>

        {/* controlls */}
        <div className="w-full h-24 flex items-center justify-center py-2 ">
          <div className="mx-2 text-white">
            <label className="block mb-2 text-sm font-medium ">
              Speed: {this.state.speedValue}{" "}
              <span className="text-red-400">
                (slide left to increase speed and right to slow down)
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              value={this.state.speedValue}
              onChange={this.handleSpeedChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
            />
          </div>
          <div className="mx-2 text-white">
            <label className="block mb-2 text-sm font-medium ">
              Array Size: {this.state.sliderValue}
            </label>
            <input
              type="range"
              min="50"
              max="300"
              value={this.state.sliderValue}
              onChange={this.handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
            />
          </div>
          <button
            className="p-3 bg-fuchsia-700 px-4 text-white rounded-sm cursor-pointer"
            onClick={this.resetArray}
          >
            Generate New Array
          </button>
          <div className="mx-2">
            <select
              className="px-4 py-3 border bg-gray-700 text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
              value={this.state.selectedAlgo}
              onChange={(event) => {
                this.setState({ selectedAlgo: event.target.value });
              }}
            >
              <option value="">Select an option</option>
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="quick">Quick Sort</option>
              <option value="heap">Heap Sort</option>
            </select>
            {/* <p className="mt-2 text-sm text-gray-600">
              Selected: {this.state.selectedAlgo || "None"}
            </p> */}
          </div>
          <button
            className="p-3 bg-fuchsia-700 px-4 text-white rounded-sm cursor-pointer"
            onClick={this.handleAlgorithm}
          >
            Run Algorithm
          </button>
          {/* <div className="mx-2 text-white">
            Time Taken: {this.state.timeTaken}
          </div> */}
        </div>
      </div>
    );
  }
}
