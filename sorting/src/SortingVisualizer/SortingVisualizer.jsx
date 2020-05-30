import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithims from '../Algorithims/sortingAlgorithims.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
//const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: []
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < 390; i++){
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
    }

    mergeSort(){
        const animations = sortingAlgorithims.getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }   
     }

    testSorting(){
        for(let i = 0; i < 100; i++){
            const array = [];
            for(let j = 0; j < randomIntFromInterval(1, 1000); j++){
                array.push(randomIntFromInterval(-1000, 1000))
            }
            const javaSort = array.slice().sort((a, b) => a-b);
            const methodSort = sortingAlgorithims.getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaSort, methodSort));
        }
    }

    render(){
        const {array} = this.state;
        return (
        <>
        <div className = "array-container">
        {array.map((value, idx) => (
            <div className = "array-bar" key={idx} style = {{height: `${value}px`}}>
            </div>
        ))
        }
        <button onClick={() => this.resetArray()}>
            Generate New Array
        </button>
        <button onClick={() => this.mergeSort()}>
            Merge Sort
        </button>
        <button onClick={() => this.testSorting()}>
            Test Sorting
        </button>
        </div>
        </>
        );
    }
}

function arraysAreEqual (array1, array2){
    if(array1.length !== array2.length){
        return false;
    }
    for(let i = 0; i < array1.length; i++){
        if(array1[i] !== array2[i]){
            return false;
        }
    }
    return true;
}

function randomIntFromInterval (min, max){
    return Math.floor(Math.random() * (max- min + 1) + min)
}