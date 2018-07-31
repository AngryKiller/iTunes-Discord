const {BrowserWindow} = require('electron');
const path = require('path');
const ejse = require('ejs-electron');
const url = require('url');
var exports = module.exports = {};
const views = path.join(__dirname, '../views');

let preferencesWindow;

ejse.data('username', 'Some Guy');

exports.showPreferences = function() {
        preferencesWindow = new BrowserWindow({width: 520, height: 450, minWidth: 520, minHeight: 450, fullscreenable: false, titleBarStyle: "hiddenInset", vibrancy: "light", transparent: true});
        preferencesWindow.loadURL(url.format({
            pathname: path.join(views, 'preferences.ejs'),
            protocol: 'file:',
            slashes: true
        }));
        preferencesWindow.setMenu(null);
    //preferencesWindow.webContents.openDevTools();
};