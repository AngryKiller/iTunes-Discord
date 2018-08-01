const {ipcMain, app} = require('electron');
const Store = require('electron-store');
const defaultConfig = {"launch-at-login": true, "language": "english"};
const store = new Store({defaults: defaultConfig});


ipcMain.on('launch-at-login', (event, arg) => {
    console.log('IPC message received! editing launch at login config.');
    store.set('launch-at-login', arg);
    app.setLoginItemSettings({'openAtLogin': arg});
});
ipcMain.on('language', (event, arg) => {
    console.log('IPC message received! editing language.');
    store.set('language', arg);
});
ipcMain.on('getvalue-launch-at-login', (event, arg) => {
    event.sender.send('value-launch-at-login', store.get('launch-at-login'));
});
ipcMain.on('getvalue-language', (event, arg) => {
    event.sender.send('value-language', store.get('language'));
});


console.log("settings.js loaded");