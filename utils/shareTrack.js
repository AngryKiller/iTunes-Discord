exports = module.exports = {};
const appleMusicLink = require('get-apple-music-link');
const { clipboard } = require('electron');
const itunes = require('itunes-bridge');
const notifier = require('node-notifier');
const lang = require('./lang');

exports.getShareLink = function(){
    const currentTrack = itunes.getCurrentTrack();
    appleMusicLink.track(currentTrack.name, currentTrack.artist, function(res, err){
       if(err){
           notifier.notify({
               title: lang.get.error,
               message: lang.get.notfindindb
           });
       }
       else{
           clipboard.writeText("https://song.link/"+res);
           notifier.notify({
               title: lang.get.success,
               message: lang.get.copiedinclipboard
           });
       }
    });
};