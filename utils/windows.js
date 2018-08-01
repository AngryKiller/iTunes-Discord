const {BrowserWindow} = require('electron');
const path = require('path');
const ejse = require('ejs-electron');
const lang = require('./lang');
const url = require('url');
var exports = module.exports = {};
const views = path.join(__dirname, '../views');

let preferencesWindow;
console.log(lang.get);
lang.list(function(languages){
    ejse.data('langList', languages);
});
ejse.data('lang', lang.get);

exports.showPreferences = function() {
        preferencesWindow = new BrowserWindow({width: 520, height: 450, minWidth: 520, minHeight: 450, fullscreenable: false, titleBarStyle: "hiddenInset", vibrancy: "medium-light", transparent: true});
        preferencesWindow.loadURL(url.format({
            pathname: path.join(views, 'preferences.ejs'),
            protocol: 'file:',
            slashes: true
        }));
        preferencesWindow.setMenu(null);
    //preferencesWindow.webContents.openDevTools();
};