const client = require('discord-rich-presence')('420530637485637644');
const iTunes = require('itunes-bridge');


var state = iTunes.getCurrentTrackName() + " - " + iTunes.getCurrentTrackArtist();
var details = iTunes.getCurrentTrackAlbum();
var duration = iTunes.getCurrentTrackDuration();
client.updatePresence({
    state: state,
    details: details,
    largeImageKey: 'itunes_large',
    instance: true,
});

console.log(state);
console.log(details);
console.log(duration);
