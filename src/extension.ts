import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const proj_name = "gotomanual";
    //console.log(proj_name+' started..');
    const config = vscode.workspace.getConfiguration(proj_name+'.url');

    //Google search - done with different keyword
    const google_m = vscode.commands.registerCommand('extension.gotoGoogle', () => {
        openManual(getSelectedText(), config.get("Google"), 'google');
    });
    context.subscriptions.push(google_m);

    //Stackoverflow via google search - done with different keyword
    const googlestack_m = vscode.commands.registerCommand('extension.gotoGoogleStackOverFlow', () => {
        openManual(getSelectedText(), config.get("GoogleStackOverFlow"), 'GoogleStackOverFlow');
    });
    context.subscriptions.push(googlestack_m);

    //rest of the extensions
    const ext_base = 'extension.gotomanual';
    const cmds = ['PHP', 'CSS', 'Python', 'Golang', 'CPP'];
    cmds.forEach((c) => {
        const cmd_m = vscode.commands.registerCommand(ext_base+c, () => {
            if (c=='PHP') {
                openManual(getSelectedText().replace(/_/g, '-'), config.get(c), c);
            } else {
                openManual(getSelectedText(), config.get(c), c);
            }
        });
        context.subscriptions.push(cmd_m);
    });
}

export function deactivate() { }

// ----------------------------------------------------------------------------------------

/**
 * Launch the Search URL in default browser
 *
 * @param string selectedText
 * @param any settings
 * @param string findin
 *
 * @return void
 */
function openManual(selectedText: string, settings: any, findin: string): void
{
    if (!selectedText) {
        return;
    }

    vscode.window.showInformationMessage('> goTo: finding \''+selectedText+'\'...');

    if ((findin == 'google' || findin == 'GoogleStackOverFlow')
        && vscode.window.activeTextEditor
        && vscode.window.activeTextEditor.document.languageId != 'plaintext') {
        selectedText = '"'+vscode.window.activeTextEditor.document.languageId+'" '+selectedText;
    }

    const query = settings.replace("%SELECTION%", encodeURI(selectedText));
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(query));
}

/**
 * Get selected text from the active editor
 *
 * @return string
 */
function getSelectedText(): string
{
    if (vscode.window.activeTextEditor) {
        const documentText = vscode.window.activeTextEditor.document.getText();
        if (!documentText) {
            return '';
        }

        const activeSelection = vscode.window.activeTextEditor.selection;
        if (activeSelection.isEmpty) {
            return '';
        }

        const selStartoffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.start);
        const selEndOffset = vscode.window.activeTextEditor.document.offsetAt(activeSelection.end);

        let selectedText = documentText.slice(selStartoffset, selEndOffset).trim();
        selectedText = selectedText.replace(/\s\s+/g, ' ');
        return selectedText;
    } else {
        return '';
    }
}
