import React, { useEffect, useState } from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations, mergeSort } from '../sortingAlgorithms/MergeSort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SortingVisualizer = () => {

    const [array, setArray] = useState<number[]>([]);

    useEffect(() => {
        resetArray();
    }, []);

    function resetArray() {
        const newArray: number[] = [];
        for (let i = 0; i < 100; i++) {
            newArray.push(randomIntFromInterval(5, 730));
        }
        setArray(newArray);
    }

    function mergeSortArray() {
        const animations = getMergeSortAnimations(array);
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

    function quickSort() { }
    function heapSort() { }
    function bubbleSort() { }

    function testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const testArray: number[] = [];
            const length = randomIntFromInterval(1, 1000);
            for (let j = 0; j < length; j++) {
                testArray.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = testArray.slice().sort((a, b) => a - b);
            const mergeSortedArray = getMergeSortAnimations(testArray.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    return (
        <div className='array-container'>
            {array.map((value, idx) => (
                <div className='array-bar' key={idx} style={{ height: `${value}px` }} />
            ))}
            <button onClick={resetArray}>Generate New Array</button>
            <button onClick={mergeSortArray}>Merge Sort</button>
            <button onClick={quickSort}>Quick Sort</button>
            <button onClick={heapSort}>Heap Sort</button>
            <button onClick={bubbleSort}>Bubble Sort</button>
            <button onClick={testSortingAlgorithms}>Test Algorithms</button>
        </div>
    );
}

function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne: number[], arrayTwo: number[]): boolean {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
    }
    return true;
}

export default SortingVisualizer;