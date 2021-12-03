import DynamicInput from './dynamicinput.js';

const loadPage = function (oPage) {

    const aCurrentPageContent = document.body.childNodes;
    if (aCurrentPageContent) {
        aCurrentPageContent.forEach(element => {
            document.body.removeChild(element);
        });
    }
    oPage.render();

};

let dynamicInput = new DynamicInput();
loadPage(dynamicInput);