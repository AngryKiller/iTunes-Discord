const {app} = require('electron');
app.dock.hide();
const tray = require('./tray');
const rpc = require('./rpc');

function addTray() {
    tray.create();
    console.log("Tray added in the status bar!");
}

app.on('ready', function() {
    addTray();
});

app.on('quit', function() {
    rpc.disconnectRpc();
});