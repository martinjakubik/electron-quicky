import DynamicInput from './dynamicinput.js';

const loadPage = function (oPage) {

    const oCurrentPage = document.getElementById('currentPage');
    if (oCurrentPage) {
        const aCurrentPageContent = oCurrentPage.childNodes;
        const nNumberOfElements = aCurrentPageContent.length;
        for (let index = nNumberOfElements - 1; index >= 0; index--) {
            const oElement = aCurrentPageContent[index];
            oCurrentPage.removeChild(oElement);
        }
    }
    oPage.render();

};

const oCurrentPage = document.createElement('div');
oCurrentPage.id = 'currentPage';
document.body.appendChild(oCurrentPage);
let oDynamicInputPage = new DynamicInput(oCurrentPage);
loadPage(oDynamicInputPage);

const aPages = [];
aPages.push(oDynamicInputPage);

aPages.forEach(oPage => {
    const oPageLinkParagraph = document.createElement('p');
    const oPageLink = document.createElement('a');
    oPageLink.text = oPage.getName();
    oPageLink.onclick = loadPage.bind(this, oPage);
    oPageLinkParagraph.appendChild(oPageLink);
    document.body.appendChild(oPageLinkParagraph);
});