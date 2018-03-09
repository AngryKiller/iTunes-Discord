const {ipcMain} = require('electron');
const settings = require('electron-settings');
const cmd = process.argv[1];
//this isn't working yet
ipcMain.on('log-error', () => {
    console.log('IPC message received!');
});
settings.set('name', {
    first: 'Cosmo',
    last: 'Kramer'
});
if (cmd == '--squirrel-firstrun') {
    console.log("premier lancement mamène");
}

settings.get('name.first');
console.log("settings.js loaded");