const vscode = require('vscode');
const ext_name = "gotomanual";
const CMD_ID = "extension."+ext_name;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context)
{
    //console.log('Congratulations, your extension "gotomanual" is now active!');

    const disposable = vscode.commands.registerTextEditorCommand(CMD_ID, openManual);

	//let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
    //vscode.window.showInformationMessage('Hello World Hello hello!');
	//});

    context.subscriptions.push(disposable);
}
exports.activate = activate;


function deactivate() {}
//exports.deactivate = deactivate;

module.exports = {
	activate,
	deactivate
}

// --------------------------------------------

//Function to launch the Search URL in default browser
function openManual()
{
    var selectedText = GetSelectedText();
    if(!selectedText) return;


    let searchCfg = vscode.workspace.getConfiguration(ext_name);
    const queryTemplate = searchCfg.get("QueryTemplate");

    let uriText = encodeURI(selectedText);
    let query = queryTemplate.replace("%SELECTION%", uriText);

    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(query));
}


/** Get Selected Text **/
function GetSelectedText()
{
    const documentText = vscode.window.activeTextEditor.document.getText();
    if (!documentText) {
      return "";
    }
    let activeSelection = vscode.window.activeTextEditor.selection;
    if (activeSelection.isEmpty) {
      return "";
    }
    const selStartoffset = vscode.window.activeTextEditor.document.offsetAt(
      activeSelection.start
    );
    const selEndOffset = vscode.window.activeTextEditor.document.offsetAt(
      activeSelection.end
    );

    let selectedText = documentText.slice(selStartoffset, selEndOffset).trim();
    selectedText = selectedText.replace(/\s\s+/g, " ");
    return selectedText;
}



