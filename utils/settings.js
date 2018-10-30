const {ipcMain, app} = require('electron');
const Store = require('electron-store');
const defaultConfig = {"launch-at-login": true, "language": "english", "appTitle": "itunes", "line-1": null, "line-2": null};
const store = new Store({defaults: defaultConfig});
const open = require('open');

ipcMain.on('launch-at-login', (event, arg) => {
    console.log('IPC message received! editing launch at login config.');
    store.set('launch-at-login', arg);
    app.setLoginItemSettings({'openAtLogin': arg});
});
ipcMain.on('language', (event, arg) => {
    console.log('IPC message received! editing language.');
    store.set('language', arg);
});
ipcMain.on('appTitle', (event, arg) => {
    console.log('IPC message received! editing app title.');
    store.set('appTitle', arg);
});
ipcMain.on('link', (event, arg) => {
    open(arg);
});


console.log("settings.js loaded");
