const {app, BrowserWindow} = require('electron');
const path = require('path');
const ejse = require('ejs-electron');
const lang = require('./lang');
const url = require('url');
const Store = require('electron-store');
const store = new Store();
var exports = module.exports = {};
const views = path.join(__dirname, '../views');

let willQuitApp = false;
let preferencesWindow;

lang.list(function(languages){
    ejse.data('langList', languages);
});

app.commandLine.appendSwitch('disable-pinch');

// EJS variables
ejse.data('lang', lang.get);
ejse.data('version', app.getVersion());
ejse.data('currentLang', store.get('language'));
ejse.data('launchAtLogin', store.get('launch-at-login'));
ejse.data('appTitle', store.get('appTitle'));
ejse.data('line1', store.get('line-1'));
ejse.data('line2', store.get('line-2'));

exports.showPreferences = function() {
    preferencesWindow = new BrowserWindow({
        width: 520,
        height: 671,
        minWidth: 520,
        minHeight: 671,
        fullscreenable: false,
        titleBarStyle: "hiddenInset",
        vibrancy: "medium-light",
        transparent: true,
        show: false,
        webPreferences: {experimentalFeatures: true, nodeIntegration: true}
    });
    preferencesWindow.loadURL(url.format({
        pathname: path.join(views, 'preferences.ejs'),
        protocol: 'file:',
        slashes: true
    }));
    preferencesWindow.setMenu(null);


    preferencesWindow.once('ready-to-show', () => {
        preferencesWindow.show()
    });

    preferencesWindow.on('close', (e) => {
        if (willQuitApp) {
            /* the user tried to quit the app */
            preferencesWindow = null;
        } else {
            /* the user only tried to close the window */
            e.preventDefault();
            preferencesWindow.hide();
        }
    });
}

app.on('before-quit', () => willQuitApp = true);