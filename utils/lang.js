exports = module.exports = {};
require ('hazardous');
const path = require ('path');
const Store = require('electron-store');
const store = new Store();
const lang = store.get('language');
const fs = require('fs');

exports.get = require('../lang/'+lang);
const langPath = path.join(__dirname, '../lang');
exports.list = function(callback){
    fs.readdir(langPath, function(err, items) {
        callback(items);
    });
};