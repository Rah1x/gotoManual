const vscode = require('vscode');
const proj_name = "gotomanual";

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context)
{
    //console.log(proj_name+' started..')

    //let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
    //vscode.window.showInformationMessage('Hello World Hello hello!');
    //});

    let config = vscode.workspace.getConfiguration(proj_name+'.url');

    //Google search - done with different keyword
    const google_m = vscode.commands.registerCommand('extension.gotoGoogle', function() {
        openManual(GetSelectedText(), config.get("Google"));
    }); context.subscriptions.push(google_m);


    let ext_starts = 'extension.gotomanual';
    let cmds = ['PHP', 'JS', 'CSS', 'Python', 'Golang', 'CPP'];

    cmds.forEach(function(c)
    {
        let cmd_m = vscode.commands.registerCommand(ext_starts+c, function()
        {
            if(c=='PHP')
            openManual(GetSelectedText().replace(/_/g, '-'), config.get(c));
            else
            openManual(GetSelectedText(), config.get(c));
        });

        context.subscriptions.push(cmd_m);
    });

    /*
    const php_m = vscode.commands.registerCommand(ext_starts+'PHP', function() {
        openManual(GetSelectedText().replace(/_/g, '-'), config.get("PHP"));
    }); context.subscriptions.push(php_m);

    const js_m = vscode.commands.registerCommand(ext_starts+'JS', function() {
        openManual(GetSelectedText(), config.get("JS"));
    }); context.subscriptions.push(js_m);

    const css_m = vscode.commands.registerCommand(ext_starts+'CSS', function() {
        openManual(GetSelectedText(), config.get("CSS"));
    }); context.subscriptions.push(css_m);

    const python_m = vscode.commands.registerCommand(ext_starts+'Python', function() {
        openManual(GetSelectedText(), config.get("Python"));
    }); context.subscriptions.push(python_m);

    const golang_m = vscode.commands.registerCommand(ext_starts+'Golang', function() {
        openManual(GetSelectedText(), config.get("Golang"));
    }); context.subscriptions.push(golang_m);
    */

}//end func..

exports.activate = activate;

function deactivate() {}
//exports.deactivate = deactivate;

module.exports = {
	activate,
	deactivate
}

// ----------------------------------------------------------------------------------------

//Function to launch the Search URL in default browser
/**
 * @param {string} selectedText
 * @param {string} settings
 */
function openManual(selectedText, settings)
{
    if(!selectedText) return;

    vscode.window.showInformationMessage('goTo: finding \''+selectedText+'\'...');

    let query = settings.replace("%SELECTION%", encodeURI(selectedText));
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(query));
}


/** Get Selected Text **/
function GetSelectedText()
{
    const documentText = vscode.window.activeTextEditor.document.getText();
    if (!documentText) return "";

    let activeSelection = vscode.window.activeTextEditor.selection;
    if (activeSelection.isEmpty) return "";

    const selStartoffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.start);
    const selEndOffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.end);

    let selectedText = documentText.slice(selStartoffset, selEndOffset).trim();
    selectedText = selectedText.replace(/\s\s+/g, " ");

    return selectedText;
}