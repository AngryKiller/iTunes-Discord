const {Tray, nativeImage, Menu} = require('electron');
const path = require('path');
const windows = require('./windows');
const lang = require('./lang');
const shareTrack = require('./shareTrack');
var exports = module.exports = {};

// The tray that will be shown on launch in the status bar

function buildMusicLabel(currentTrack){
    switch(currentTrack.playerState){
        case "playing": {
            const musicLabel = {label: '▶: ' + currentTrack.name +" "+lang.get.by+" "+ currentTrack.artist, type: 'normal'};
            return musicLabel;
            break;
        }
        case "paused": {
            const musicLabel = {label: '❙❙: ' + currentTrack.name +" "+lang.get.by+" "+ currentTrack.artist, type: 'normal'};
            return musicLabel;
            break;
        }
        case "stopped":{
            const musicLabel = {label: lang.get.itunesnotplaying};
            return musicLabel;
            break;
        }
    }

}


exports.create = function() {
    // Choosing a different tray icon depending on the OS
    if(process.platform === "darwin"){
        const trayIcon = path.join(__dirname, '../assets/img/icon@2x.png');
        const nImage = nativeImage.createFromPath(trayIcon);
        tray = new Tray(nImage);
        tray.setToolTip('iTunes⇄Discord');
        return tray;
    }
    else{
        const trayIcon = path.join(__dirname, '../assets/img/icon.ico');
        const nImage = nativeImage.createFromPath(trayIcon);
        tray = new Tray(nImage);
        tray.setToolTip('iTunes⇄Discord');
        return tray;
    }
};

exports.update = function(currentTrack) {
    const contextMenu = Menu.buildFromTemplate([
        buildMusicLabel(currentTrack),
        {label: lang.get.sharesong, type: 'normal', click() {shareTrack.getShareLink()}},
        {type: 'separator'},
        {label: lang.get.preferences, type: 'normal', click() { windows.showPreferences() }},
        {type: 'separator'},
        {label: lang.get.quit, type: 'normal', role: 'quit'}
    ]);
        tray.setContextMenu(contextMenu);
        console.log("Tray information updated!")
};