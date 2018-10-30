const client = require('discord-rich-presence')('420530637485637644');
const lang = require('./lang')
exports = module.exports = {};


exports.setStatus = function(currentTrack){
    switch (currentTrack.playerState) {
        case "playing": {
            const time = new Date();
            const presence = {
                details: composeLine1(currentTrack),
                state: composeLine2(currentTrack),
                largeImageKey: 'itunes_large',
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
                largeImageKey: 'itunes_large',
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
    const line1 = '%song%'; // how to get from config.json?
    return line1.length
        ? replacePartsInLine(line1, currentTrack)
        : `▶ ${lang.get.listeningto} ${currentTrack.name} ${lang.get.by} ${currentTrack.artist}`;
}

const composeLine2 = function(currentTrack) {
    const line2 = 'by %artist% on %album%'; // how to get from config.json?
    return line2.length
        ? replacePartsInLine(line2, currentTrack)
        : `💿 ${currentTrack.album}`;
}

const replacePartsInLine = function(line, currentTrack) {
    return line
        .replace('%song%', currentTrack.name)
        .replace('%artist%', currentTrack.artist)
        .replace('%album%', currentTrack.album);
}
