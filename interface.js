const {app} = require('electron');
//app.dock.hide();
const tray = require('./functions/tray');


function addTray () {
    tray.createTray();
    console.log("Tray added in the status bar!");
    tray.updateTray(); // Starting the loop that will update the data in the tray (TODO I need a proper way to do that)
}

app.on('ready', function() {
    addTray();
})