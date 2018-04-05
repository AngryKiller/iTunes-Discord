const iTunes = require('itunes-bridge');
const rpc = require('./rpc');
const tray = require('./tray');
const iTunesEmitter = iTunes.emitter;


iTunesEmitter.on('playing', function(type, currentTrack){
    // If it is a paused track that restarts playing
    if(type === "player_state_change") {
        console.log(currentTrack.name + " has been resumed! ");
        tray.update(currentTrack);
        rpc.setStatus(currentTrack);
        // Or if it is a new track
    }else if(type === 'new_track'){
        console.log(currentTrack.name+" is now playing!")
        tray.update(currentTrack);
        rpc.setStatus(currentTrack);
    }
});
// Do something when iTunes is paused
iTunesEmitter.on('paused', function(type, currentTrack){
    console.log(currentTrack.name+" is now paused!");
    tray.update(currentTrack);
    rpc.setStatus(currentTrack);
});
// Do something when iTunes is stopped
iTunesEmitter.on('stopped', function(){
    console.log("iTunes is not longer playing!");
    tray.update({playerState: "stopped"});
    rpc.setStatus({playerState: "stopped"});
});