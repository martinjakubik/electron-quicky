import * as LearnHypertext from './lib/js/learnhypertext.mjs';

class Grid {

    constructor (parent) {

        this.parent = parent;

        this.numberOfRows = 24;
        this.sizeOfBox = 24;

        this.appConfiguration = {
            gridSize: this.numberOfRows
        };

    }

    getName () {
        return 'Grid';
    }

    render () {

        let numberOfRowInput = LearnHypertext.createSlider('numRows', '1', '36', this.numberOfRows, 'rows', 1, this.parent);

        let sizeOfBoxInput = LearnHypertext.createSlider('boxSize', '12', '64', this.sizeOfBox, 'box size', 1, this.parent);

        numberOfRowInput.onchange = handleNumberOfRowChange.bind(this);

        sizeOfBoxInput.onchange = handleSizeOfBoxChange.bind(this);

        makeGrid.call(this, this.numberOfRows, this.sizeOfBox);

    }

}

let handleHover = function (event) {

    const oTarget = event.currentTarget;
    oTarget.classList.add('touch');
    setTimeout(() => {oTarget.classList.remove('touch');}, 500);

};

let handleClick = function (event) {

    const oTarget = event.currentTarget;

    let nCircles = 15;
    let aCircles = [];
    for (let nCircle = 1; nCircle <= nCircles; nCircle++) {
        aCircles.push(getCircle(oTarget, nCircle, this.appConfiguration.gridSize));
    }
    aCircles.forEach((aCircle, nIndex) => setTimeout(() => aCircle.forEach(oPixel => {
        oPixel.classList.add('ripple');
        setTimeout(() => {oPixel.classList.remove('ripple');}, 156);
    }), 48 * nIndex));

};

let getCircle = function (oElement, nRadius = 1, gridSize) {

    let aCircle = [];
    let sId = oElement.id;
    let aXYCoordinates = sId.split(':').map(Number);
    let x = aXYCoordinates[0];
    let y = aXYCoordinates[1];

    if ((y - nRadius) >= 0) {
        if ((x - nRadius) >= 0) {
            aCircle.push(document.getElementById(`${x - 1}:${y - nRadius}`));
        }
        aCircle.push(document.getElementById(`${x}:${y - nRadius}`));
        if ((x + nRadius) <= gridSize - 1) {
            aCircle.push(document.getElementById(`${x + 1}:${y - nRadius}`));
        }
    }
    if ((x - nRadius) >= 0) {
        if ((y - nRadius) >= 0) {
            aCircle.push(document.getElementById(`${x - nRadius}:${y - 1}`));
        }
        aCircle.push(document.getElementById(`${x - nRadius}:${y}`));
        if ((y + nRadius) <= gridSize - 1) {
            aCircle.push(document.getElementById(`${x - nRadius}:${y + 1}`));
        }
    }
    if ((x + nRadius) <= gridSize - 1) {
        if ((y - nRadius) >= 0) {
            aCircle.push(document.getElementById(`${x + nRadius}:${y - 1}`));
        }
        aCircle.push(document.getElementById(`${x + nRadius}:${y}`));
        if ((y + nRadius) <= gridSize - 1) {
            aCircle.push(document.getElementById(`${x + nRadius}:${y + 1}`));
        }
    }
    if ((y + nRadius) <= gridSize - 1) {
        if ((x - nRadius) >= 0) {
            aCircle.push(document.getElementById(`${x - 1}:${y + nRadius}`));
        }
        aCircle.push(document.getElementById(`${x}:${y + nRadius}`));
        if ((x + nRadius) <= gridSize - 1) {
            aCircle.push(document.getElementById(`${x + 1}:${y + nRadius}`));
        }
    }

    return aCircle;

};

let makeBox = function (parentBox, sizeOfBox, x, y) {

    let box = document.createElement('div');
    parentBox.appendChild(box);

    box.style.width = sizeOfBox + 'px';
    box.style.height = sizeOfBox + 'px';
    box.id = `${x}:${y}`;
    box.onmouseover = handleHover;
    box.onclick = handleClick.bind(this);

    return box;

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
    this.appConfiguration.gridSize = numberOfRows;

    let y = 0;
    let x = 0;
    let rowBox;

    while (y < numberOfRows) {

        x = 0;
        rowBox = LearnHypertext.createDiv(`row${y}`, this.parent);
        while (x < numberOfColumns) {

            makeBox.call(this, rowBox, sizeOfBox, x, y);
            x = x + 1;

        }

        y = y + 1;

    }

};

let handleNumberOfRowChange = function (event) {

    this.numberOfRows = event.target.value;

    clearGrid();
    makeGrid.call(this, this.numberOfRows, this.sizeOfBox);

};

let handleSizeOfBoxChange = function (event) {

    this.sizeOfBox = event.target.value;

    clearGrid();
    makeGrid.call(this, this.numberOfRows, this.sizeOfBox);

};

export default Grid;