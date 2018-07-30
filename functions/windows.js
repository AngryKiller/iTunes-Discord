const {BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
var exports = module.exports = {};
const views = path.join(__dirname, '../views');

let preferencesWindow;

exports.showPreferences = function() {
        preferencesWindow = new BrowserWindow({width: 520, height: 450, minWidth: 520, minHeight: 450, fullscreenable: false, titleBarStyle: "hiddenInset"});
        preferencesWindow.loadURL(url.format({
            pathname: path.join(views, 'preferences.html'),
            protocol: 'file:',
            slashes: true
        }));
    //preferencesWindow.webContents.openDevTools();
};