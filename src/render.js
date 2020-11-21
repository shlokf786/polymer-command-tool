let settingBtn = document.getElementById('settingBtn');
let fileListBox = document.getElementById('fileListBox');

// settingBtn.addEventListener('click', (e) => console.log(window.api.getCompleteFileListForPath("msg")))
settingBtn.addEventListener('click', (e) => window.api.send("open-settings", "some data"))
console.log(window.api.getCompleteFileListForPath("E:\\Work\\electron-work\\polymer-command-tool\\src"));