const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    console.log("electron-squirrel-startup");
app.quit();
}
var settingWindow;
var mainWindow;
const createWindow = () => {
// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences:{
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "./preload.js") // use a preload script
		},
		frame : true,
		// titleBarStyle : "hidden",
	});

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, './index.html'));

	// Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.setMenuBarVisibility(false);

    settingWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences:{
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "./settings/preload.js") // use a preload script
		},
		show : false,
    });
    settingWindow.loadFile(path.join(__dirname, './settings/index.html'))

    settingWindow.on("close",(e) =>{
        console.log("close settings");
        if(settingWindow.isVisible())
            settingWindow.hide();
        e.preventDefault();
    })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
        console.log("in window-all-closed")
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});



ipcMain.on('open-settings',(event, args) => {
    if(settingWindow.isVisible())
        settingWindow.hide();
    else
        settingWindow.show();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
