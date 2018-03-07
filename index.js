const client = require('discord-rich-presence')('420530637485637644');
const iTunes = require('itunes-bridge');
const kofiloop = require('kofiloop');

console.log('iTunes-Discord started! Wait 15 seconds for the first RPC request to be sent...');
kofiloop.startLoop(function(){
    var playerState = iTunes.getPlayerState();
    if(playerState == 'playing') {
        var details = " 🎧  Playing " + iTunes.getCurrentTrackName() + " by " + iTunes.getCurrentTrackArtist();
        var state = "💿  " + iTunes.getCurrentTrackAlbum();
        var duration = iTunes.getCurrentTrackDuration();
        const endTimestamp = Date.now() + iTunes.getCurrentTrackRemainingSeconds();
        client.updatePresence({
            state: state,
            details: details,
            largeImageKey: 'itunes_large',
            smallImageKey: 'playing',
            instance: true,
        });
        console.log("iTunes is playing, informations sent: " + details + " " + state );
    }else if(playerState == 'paused'){
        var details = "⏸  Paused: " + iTunes.getCurrentTrackName() + " by " + iTunes.getCurrentTrackArtist();
        var state = "💿  " + iTunes.getCurrentTrackAlbum();
        client.updatePresence({
            state: state,
            details: details,
            largeImageKey: 'itunes_large',
            smallImageKey: 'paused',
            instance: true,
        });
        console.log("iTunes is paused, informations sent: " + details + " " + state );
    }else if(playerState == 'stopped'){
        client.updatePresence({});
        console.log("iTunes is not playing! do u kno da wae to close a Discord RPC connection? ");
    }
}, 15000);

// wen eta gui? SON.