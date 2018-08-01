exports = module.exports = {};
const jsonfile = require('jsonfile');
const Store = require('electron-store');
const store = new Store();
const path = require('path');
const lang = store.get('language');
const fs = require('fs');
const langFile = "./lang/"+lang+".json";

console.log(langFile);
exports.get = jsonfile.readFileSync(langFile);

exports.list = function(callback){
    fs.readdir("./lang/", function(err, items) {
        callback(items);
    });
};