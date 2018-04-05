const {app} = require('electron');
//app.dock.hide();
const tray = require('./functions/tray');
const rpc = require('./functions/rpc');

function addTray() {
    tray.create();
    console.log("Tray added in the status bar!");
}

app.on('ready', function() {
    addTray();
});

app.on('window-all-closed', function () {
    //
});

app.on('quit', function() {
    rpc.disconnectRpc();
});