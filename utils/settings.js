const {ipcMain, app} = require('electron');
const Store = require('electron-store');
const defaultConfig = {"launch-at-login": true, "language": "english", "appTitle": "itunes", "line-1": null, "line-2": null};
const store = new Store({defaults: defaultConfig});
const open = require('open');
const isDev = require('electron-is-dev');

ipcMain.on('launch-at-login', (event, arg) => {
    if(isDev){
        console.log("Launch at login has not been modified as iTunes-Discord is running in development mode");
    }else {
        console.log('IPC message received! editing launch at login config.');
        store.set('launch-at-login', arg);
        app.setLoginItemSettings({'openAtLogin': arg});
    }
});
ipcMain.on('language', (event, arg) => {
    console.log('IPC message received! editing language.');
    store.set('language', arg);
});
ipcMain.on('appTitle', (event, arg) => {
    console.log('IPC message received! editing app title.');
    store.set('appTitle', arg);
});
ipcMain.on('line', (event, arg) => {
    console.log('IPC message received! editing lines.');
    store.set('line-1', arg[1]);
    store.set('line-2', arg[2]);
});
ipcMain.on('link', (event, arg) => {
    open(arg);
});

console.log("settings.js loaded");
