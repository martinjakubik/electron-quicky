class DynamicInput {

    render () {

        for (let x = 10; x < 50; x++) {
            createSlider('numRows', 1, x, 12, 'rows');
        }

    }

}

const createSlider = function (sId, sMin, sMax, nValue, sLabel, nStep, oParent) {

    if (!oParent) {
        oParent = document.body;
    }

    const sName = sId;

    const oInput = document.createElement('input');
    oInput.type = 'range';
    oInput.id = sId;
    oInput.name = sName;
    oInput.min = sMin;
    oInput.max = sMax;
    oInput.value = nValue;
    if (nStep) {
        oInput.step = nStep;
    }

    const oLabel = document.createElement('label');
    oLabel.for = sId;
    oLabel.innerText = sLabel;

    oParent.appendChild(oLabel);
    oParent.appendChild(oInput);

    return oInput;

};


export default DynamicInput;