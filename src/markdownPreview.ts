function init() {

    console.log('init from markdown-queries');
    var markdownqueryElements = document.getElementsByClassName('markdownquery');
    console.log('markdownqueryElements, looking for elements with class markdownquery');
    console.log('The elements', markdownqueryElements);
    var changes: any = [];
    for (let index = 0; index < markdownqueryElements.length; index++) {
        var element = markdownqueryElements.item(index);
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