import * as vscode from 'vscode';
import * as path from 'path';
const initSqlJs = require('sql.js');
import * as sqljs from 'sql.js';

class ServiceManager {
    private static instance: ServiceManager | null = null;
    private startup: string;
    private db: any;

    private constructor(startup: string = "not startup") {
        this.startup = startup;
    }

    public static async init(startup: string = "not startup"): Promise<ServiceManager> {
        if (!ServiceManager.instance) {
            ServiceManager.instance = new ServiceManager(startup);
        }
        await ServiceManager.instance.openDB();
        return new Promise((resolve, reject) => {
            if (ServiceManager.instance) {
                resolve(ServiceManager.instance);
            }
            else {
                reject("ServiceManager instance is null");
            }
        }
        )
    }

    public static getInstance(startup: string = "not startup"): ServiceManager{
        return this.instance!; 
    }

    private async openDB(): Promise<void> {
        const fileName = 'markdown.db';
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0]; // Get the first workspace folder
        if (workspaceFolder) {
            const fileUri = vscode.Uri.file(path.join(workspaceFolder.uri.fsPath, fileName));
            console.log('fileUri', fileUri)
            const dbData = await vscode.workspace.fs.readFile(fileUri)
                .then((data) => {
                    vscode.window.showInformationMessage(`Opened database file: ${fileName}`);
                    return data; // Return the data
                }).then(undefined, err => {
                    vscode.window.showErrorMessage(`Unable to open database file: ${fileName}`)
                });
            const SQL = await initSqlJs();
            this.db = new SQL.Database(await dbData);
            console.log('openDB');
        }
    }

    public testQuery(): string {
        if (!this.db) {
            throw "Database is not initialized";
        } else {
            var result = this.db.exec("SELECT count(*) FROM files")[0].values[0][0];
            return result;
        }
    }

    public runQuery(query: string): sqljs.QueryResults {
        if (!this.db) {
            throw "Database is not initialized";
        } else {
            var result = this.db.exec(query)[0];
            return result;
        }
    }
}

export default ServiceManager;
