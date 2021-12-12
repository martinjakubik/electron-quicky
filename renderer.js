let makeBox = function (parentBox) {

    let box = document.createElement('div');
    parentBox.appendChild(box);

    return box;

};

let makeGrid = function (numberOfRows) {

    let numberOfColumns = numberOfRows;

    let y = 0;
    let x = 0;
    let rowBox;

    while (y < numberOfRows) {

        x = 0;
        rowBox = document.createElement('div');
        document.body.appendChild(rowBox);

        while (x < numberOfColumns) {

            makeBox.call(this, rowBox);
            x = x + 1;

        }

        y = y + 1;

    }

};

makeGrid(5);