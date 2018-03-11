const client = require('discord-rich-presence')('420530637485637644');
const iTunes = require('itunes-bridge');
const kofiloop = require('kofiloop');
exports = module.exports = {};

function getPlayerInfos(){
    return {state: iTunes.getPlayerState(), song: iTunes.getCurrentTrackName(), artist: iTunes.getCurrentTrackArtist(), album: iTunes.getCurrentTrackAlbum()};
}

function setRpcPlayingStatus(){
    var player = getPlayerInfos();
    switch (player.state) {
        case "playing": {
            var presence = {details: "Playing "+player.song+" by "+player.artist, state: "💿 "+player.album, largeImageKey: 'itunes_large', smallImageKey: 'playing', instance: false};
            client.updatePresence(presence);
            console.log("Sent player informations to rpc!");
            break;
        }
        case "paused": {
            var presence = {details: "Paused: "+player.song+" by "+player.artist, state: "💿 "+player.album, largeImageKey: 'itunes_large', smallImageKey: 'paused', instance: false};
            client.updatePresence(presence);
            console.log("Sent player informations to rpc!");
            break;
        }
        case "stopped":
        case "not running": {
            client.disconnect();
        }
    }
}

kofiloop.startLoop(function(){
    setRpcPlayingStatus();
}, 15000);

exports.disconnectRpc = function() {
    client.disconnect();
};