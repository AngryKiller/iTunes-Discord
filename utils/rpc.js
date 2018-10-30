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
            const presence = {details: "▶ "+lang.get.listeningto+" "+currentTrack.name+" "+lang.get.by+" "+currentTrack.artist, state: "💿 "+currentTrack.album, largeImageKey: 'appicon', smallImageKey: 'playing',startTimestamp: time,  endTimestamp: new Date(time.getTime() + (currentTrack.remainingTime * 1000)), instance: false};
            client.updatePresence(presence);
            console.log("Sent player informations to rpc!");
            break;
        }
        case "paused": {
            const presence = {details: "❙❙ "+lang.get.paused+" "+currentTrack.name+" "+lang.get.by+" "+currentTrack.artist, state: "💿 "+currentTrack.album, largeImageKey: 'appicon', smallImageKey: 'paused', instance: false};
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