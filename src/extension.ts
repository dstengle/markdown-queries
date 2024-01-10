// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below  
import * as vscode from 'vscode';
import ServiceManager from './service/ServiceManager';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    
    var serviceManager: ServiceManager;
    ServiceManager.init("startup");
    serviceManager= ServiceManager.getInstance("startup");
    
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "foam-queries" is now active!');
    
    // Register a command to print "Hello World"
    let disposable = vscode.commands.registerCommand('foamqueries.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World');
    });
    
    context.subscriptions.push(disposable);
    
    return {
        extendMarkdownIt(md: any) {
            console.log('extendMarkdownIt from foam-queries');
            const highlight = md.options.highlight;
            
            md.options.highlight = (code: any, lang: any) => {
                console.log('code found', code, lang);
                var sm = ServiceManager.getInstance();
                var result = sm.runQuery(code);
                var columnNames = result.columns;
                var rows = result.values;
                if (lang && lang.match(/\bfoamquery\b/i)) {
                    return `<div class="foamquery">${code} results in ${columnNames} ${rows}</div>`;
                }
                return highlight(code, lang);
               };
                
                return md;
            }
        }
    }
        
    
    
    
// This method is called when your extension is deactivated
export function deactivate() {}
    