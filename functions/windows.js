const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
var exports = module.exports = {};
const views = path.join(__dirname, '../views');

let preferencesWindow

exports.showPreferences = function() {
        preferencesWindow = new BrowserWindow({width: 400, height: 300, fullscreenable: false});
        preferencesWindow.loadURL(url.format({
            pathname: path.join(views, 'preferences.html'),
            protocol: 'file:',
            slashes: true
        }));
    preferencesWindow.webContents.openDevTools();
};