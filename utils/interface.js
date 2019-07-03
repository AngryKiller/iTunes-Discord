const {app} = require('electron');
if(process.platform === "darwin") {
    // hiding the dock icon on macOS as soon as possible for a better user experience
    app.dock.hide();
}
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