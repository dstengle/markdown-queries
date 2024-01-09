function init() {

    console.log('init from foam-queries');
    var foamqueryElements = document.getElementsByClassName('foamquery');
    console.log('foamqueryElements, looking for elements with class foamquery');
    console.log('The elements', foamqueryElements);
    var changes: any = [];
    for (let index = 0; index < foamqueryElements.length; index++) {
        var element = foamqueryElements.item(index);
        if (element) {
            var source = element.textContent;

            if (element.parentElement) {
                changes.push({
                    placeholder: element.parentElement,
                    text: source 
                });
            }
        }
    }
    
        for (let index = 0; index < changes.length; index++) {
            const change = changes[index];
                if (change.placeholder) {
                    change.placeholder.outerHTML = change.text;
                }
        }
    
        // use to debug rendered code.
        //document.body.appendChild(document.createTextNode(document.body.innerHTML));
    }
    
window.addEventListener('vscode.markdown.updateContent', init);

init();