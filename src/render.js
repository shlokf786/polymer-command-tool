let settingBtn = document.getElementById('settingBtn');
let fileListBox = document.getElementById('fileListBox');
let tempPath1="C:\\UX\\for Scanning\\30-10-2020 1300\\cstview-asset-manager";
let tempPath2="E:\\Work\\electron-work\\polymer-command-tool\\src";
var fileList=[];
settingBtn.addEventListener('click', (e) => window.api.send("open-settings"))
window.api._setOriginalFolderPath(tempPath1);
fileList=window.api.getCompleteFileListForPath(tempPath1);
if(fileList.length>0){
    for(let item of fileList){
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item));
        li.setAttribute("class","list-group-item");
        fileListBox.appendChild(li)
    }
}