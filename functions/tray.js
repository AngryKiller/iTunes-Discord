const {Tray, nativeImage, Menu} = require('electron');
const path = require('path');
const trayIcon = path.join(__dirname, '../assets/img/icon@2x.png');
const nImage = nativeImage.createFromPath(trayIcon);
const iTunes = require('itunes-bridge');
const kofiloop = require('kofiloop');
const windows = require('./windows');
// The tray that will be shown on launch in the status bar


function getPlayerInfos(){
    return {state: iTunes.getPlayerState(), song: iTunes.getCurrentTrackName(), artist: iTunes.getCurrentTrackArtist(), album: iTunes.getCurrentTrackAlbum()};
}
function buildMusicLabel(){
    var playerState = iTunes.getPlayerState();
    switch(playerState){
        case "playing": {
            var player = getPlayerInfos();
            var musicLabel = {label: '▶ Playing: ' + player.song + " by " + player.artist, type: 'normal'};
            return musicLabel;
            break;
        }
        case "paused": {
            var player = getPlayerInfos();
            var musicLabel = {label: '❙❙ Paused: ' + player.song + " by " + player.artist, type: 'normal'};
            return musicLabel;
            break;
        }
        case "not running":
        case "stopped":{
            var musicLabel = {label: '■ iTunes is not playing...'};
            return musicLabel;
            break;
        }
    }

}

const contextMenu = Menu.buildFromTemplate([
    buildMusicLabel(),
    {type: 'separator'},
    {label: 'Preferences', type: 'normal', click() { windows.showPreferences() }},
    {type: 'separator'},
    {label: 'Quit', type: 'normal', role: 'quit'}
]);

var exports = module.exports = {};

exports.createTray = function() {
    tray = new Tray(nImage);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('iTunes-Discord');
    return tray;
};

exports.updateTray = function() {
    // To update the tray data, we launch a kofiloop that will get the data from iTunes-bridge and then set the tray context menu to the one containing new data.
    kofiloop.startLoop(function(){
        const contextMenu = Menu.buildFromTemplate([
            buildMusicLabel(),
            {type: 'separator'},
            {label: 'Preferences', type: 'normal'},
            {type: 'separator'},
            {label: 'Quit', type: 'normal', role: 'quit'}
        ])
        tray.setContextMenu(contextMenu);
        console.log("Tray information updated!")
    }, 5000);
};