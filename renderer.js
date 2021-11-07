// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// const learnhypertext = require('./lib/js/learnhypertext.mjs');
import * as LearnHypertext from './lib/js/learnhypertext.mjs';

let handleHover = function (event) {

    const oTarget = event.currentTarget;
    oTarget.classList.add('touch');
    setTimeout(() => {oTarget.classList.remove('touch');}, 500);

};

let handleClick = function (event) {

    const oTarget = event.currentTarget;

    let aNeighbors = getNeighbors(oTarget);
    aNeighbors.forEach(oNeighbor => {
        oNeighbor.classList.add('neighbor');
        setTimeout(() => {oNeighbor.classList.remove('neighbor');}, 360);
    });

};

let makeBox = function (parentBox, sizeOfBox, x, y) {

    let box = document.createElement('div');
    parentBox.appendChild(box);

    box.style.width = sizeOfBox + 'px';
    box.style.height = sizeOfBox + 'px';
    box.id = `${x}:${y}`;
    box.onmouseover = handleHover;
    box.onclick = handleClick;

    return box;

};

let getNeighbors = function (oElement) {

    let aNeighbors = [];
    let sId = oElement.id;
    let aXYCoordinates = sId.split(':').map(Number);
    let x = aXYCoordinates[0];
    let y = aXYCoordinates[1];

    if (y > 0) {
        aNeighbors.push(document.getElementById(`${x}:${y - 1}`));
    }

    if (x > 0) {
        aNeighbors.push(document.getElementById(`${x - 1}:${y}`));
    }
    if (x < oAppConfiguration.gridSize - 1) {
        aNeighbors.push(document.getElementById(`${x + 1}:${y}`));
    }

    if (y < oAppConfiguration.gridSize - 1) {
        aNeighbors.push(document.getElementById(`${x}:${y + 1}`));
    }

    return aNeighbors;

};

let clearGrid = function () {

    let boxes = document.getElementsByTagName('div');
    let indexOfLastBox;
    let lastBox;
    let parentElement;

    while (boxes.length > 0) {

        indexOfLastBox = boxes.length - 1;
        lastBox = boxes.item(indexOfLastBox);
        parentElement = lastBox.parentElement;
        parentElement.removeChild(lastBox);

    }

};

let makeGrid = function (numberOfRows, sizeOfBox) {

    let numberOfColumns = numberOfRows;

    let y = 0;
    let x = 0;
    let rowBox;

    while (y < numberOfRows) {

        x = 0;
        rowBox = LearnHypertext.createDiv(`row${y}`);
        while (x < numberOfColumns) {

            makeBox(rowBox, sizeOfBox, x, y);
            x = x + 1;

        }

        y = y + 1;

    }

};

let handleNumberOfRowChange = function (event) {

    numberOfRows = event.target.value;

    clearGrid();
    makeGrid(numberOfRows, sizeOfBox);

};

let handleSizeOfBoxChange = function (event) {

    sizeOfBox = event.target.value;

    clearGrid();
    makeGrid(numberOfRows, sizeOfBox);

};

let numberOfRowInput = LearnHypertext.createTextInput('numRows', '', 'rows');

let sizeOfBoxInput = LearnHypertext.createTextInput('boxSize', '', 'box size');

numberOfRowInput.onchange = handleNumberOfRowChange;

sizeOfBoxInput.onchange = handleSizeOfBoxChange;

let numberOfRows = 4;
let sizeOfBox = 16;

let oAppConfiguration = {
    gridSize: 0
};

makeGrid(numberOfRows, sizeOfBox);