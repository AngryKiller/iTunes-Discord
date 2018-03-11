const {ipcMain, app} = require('electron');
const Store = require('electron-store');
const defaultConfig = {"launch-at-login": true};
const store = new Store({defaults: defaultConfig});


ipcMain.on('launch-at-login', (event, arg) => {
    console.log('IPC message received! editing launch at login config.');
    store.set('launch-at-login', arg);
    app.setLoginItemSettings({'openAtLogin': arg});
});
ipcMain.on('getvalue-launch-at-login', (event, arg) => {
    event.sender.send('value-launch-at-login', store.get('launch-at-login'));
});


console.log("settings.js loaded");