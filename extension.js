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
        openManual(GetSelectedText(), config.get("Google"), 'google');
    }); context.subscriptions.push(google_m);

    //Stackoverflow via google search - done with different keyword
    const googlestack_m = vscode.commands.registerCommand('extension.gotoGoogleStackOverFlow', function() {
        openManual(GetSelectedText(), config.get("GoogleStackOverFlow"), 'GoogleStackOverFlow');
    }); context.subscriptions.push(googlestack_m);


    let ext_base = 'extension.gotomanual';
    let cmds = ['PHP', 'CSS', 'Python', 'Golang', 'CPP'];

    cmds.forEach(function(c)
    {
        let cmd_m = vscode.commands.registerCommand(ext_base+c, function()
        {
            if(c=='PHP')
            openManual(GetSelectedText().replace(/_/g, '-'), config.get(c), c);
            else
            openManual(GetSelectedText(), config.get(c), c);
        });

        context.subscriptions.push(cmd_m);
    });

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
 * @param {string} findin
 */
function openManual(selectedText, settings, findin)
{
    if(!selectedText) return;

    vscode.window.showInformationMessage('goTo: finding \''+selectedText+'\'...');

    if((findin=='google' || findin=='GoogleStackOverFlow') && vscode.window.activeTextEditor.document.languageId!='plaintext')
    selectedText = vscode.window.activeTextEditor.document.languageId+' '+selectedText;

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