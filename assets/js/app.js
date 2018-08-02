const ipc = require('electron').ipcRenderer;
function checkbox(parameter, id){
    if(document.getElementById(id).checked) {
        ipc.send(parameter, true);
    }else{
        ipc.send(parameter, false);
    }
}
function changeLanguage(){
    var select = document.getElementById("language");
    var value = select.options[select.selectedIndex].value;
    var alert = document.getElementById("lang-alert");
    ipc.send("language", value);
    alert.style.display = "block";
}
function openLink(link){
    ipc.send("link", link);
}