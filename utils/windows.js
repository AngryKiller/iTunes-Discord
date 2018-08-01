const {app, BrowserWindow} = require('electron');
const path = require('path');
const ejse = require('ejs-electron');
const lang = require('./lang');
const url = require('url');
const Store = require('electron-store');
const store = new Store();
var exports = module.exports = {};
const views = path.join(__dirname, '../views');

let preferencesWindow;
console.log(lang.get);
lang.list(function(languages){
    ejse.data('langList', languages);
});
app.commandLine.appendSwitch('disable-pinch');
ejse.data('lang', lang.get);
ejse.data('version', app.getVersion());
ejse.data('currentLang', store.get('language'));
ejse.data('launchAtLogin', store.get('launch-at-login'));
console.log(app.getVersion());

exports.showPreferences = function() {
        preferencesWindow = new BrowserWindow({width: 520, height: 671, minWidth: 520, minHeight: 671, fullscreenable: false, titleBarStyle: "hiddenInset", vibrancy: "medium-light", transparent: true});
        preferencesWindow.loadURL(url.format({
            pathname: path.join(views, 'preferences.ejs'),
            protocol: 'file:',
            slashes: true
        }));
        preferencesWindow.setMenu(null);
    //preferencesWindow.webContents.openDevTools();
};