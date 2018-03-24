const client = require('discord-rich-presence')('420530637485637644');
exports = module.exports = {};


exports.setStatus = function(currentTrack){
    switch (currentTrack.playerState) {
        case "playing": {
            const presence = {details: "▶ Playing "+currentTrack.name+" by "+currentTrack.artist, state: "💿 "+currentTrack.album, largeImageKey: 'itunes_large', smallImageKey: 'playing', instance: false};
            client.updatePresence(presence);
            console.log("Sent player informations to rpc!");
            break;
        }
        case "paused": {
            const presence = {details: "❙❙ Paused: "+currentTrack.name+" by "+currentTrack.artist, state: "💿 "+currentTrack.album, largeImageKey: 'itunes_large', smallImageKey: 'paused', instance: false};
            client.updatePresence(presence);
            console.log("Sent player informations to rpc!");
            break;
        }
        case "stopped": {
            client.disconnect();
            break;
        }
    }
};



exports.disconnectRpc = function() {
    client.disconnect();
};