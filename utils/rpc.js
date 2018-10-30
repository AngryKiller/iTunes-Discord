const Store = require('electron-store');
const store = new Store();
const appTitle = store.get('appTitle');
switch(appTitle){
    case "itunes":{
        var clientId = "420530637485637644";
        break;
    }
    case "applemusic":{
        var clientId = "506922379809783814";
    }
}
const client = require('discord-rich-presence')(clientId);
const lang = require('./lang');
exports = module.exports = {};

exports.setStatus = function(currentTrack){
    switch (currentTrack.playerState) {
        case "playing": {
            const time = new Date();
            const presence = {
                details: composeLine1(currentTrack),
                state: composeLine2(currentTrack),
                largeImageKey: 'appicon',
                smallImageKey: 'playing',
                startTimestamp: time,
                endTimestamp: new Date(time.getTime() + (currentTrack.remainingTime * 1000)),
                instance: false
            };
            client.updatePresence(presence);
            console.log("Sent player informations to rpc!");
            break;
        }
        case "paused": {
            const presence = {
                details: composeLine1(currentTrack),
                state: composeLine2(currentTrack),
                largeImageKey: 'appicon',
                smallImageKey: 'paused',
                instance: false
            };
            client.updatePresence(presence);
            console.log("Sent player informations to rpc!");
            break;
        }
        case "stopped": {
            client.disconnect();
            console.log("Disconnected from rpc!");
            break;
        }
    }
};

exports.disconnectRpc = function() {
    client.disconnect();
};

const composeLine1 = function(currentTrack) {
    const line1 = store.get('line-1');

    return line1 != null
        ? replacePartsInLine(line1, currentTrack)
        : `🎵 ${lang.get.listeningto} ${currentTrack.name} ${lang.get.by} ${currentTrack.artist}`;
}

const composeLine2 = function(currentTrack) {
    const line2 = store.get('line-2');

    return line2 != null
        ? replacePartsInLine(line2, currentTrack)
        : `💿 ${currentTrack.album}`;
}

const replacePartsInLine = function(line, currentTrack) {
    return line
        .replace('%song%', currentTrack.name)
        .replace('%artist%', currentTrack.artist)
        .replace('%album%', currentTrack.album);
}
