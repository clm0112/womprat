const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 540,
    frame: false, // Makes window borderless
    transparent: false,
    resizable: false,
    hasShadow: false,
    roundedCorners: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('index.html');

  ipcMain.on('close-window', () => {
    win.close();
  });
}

app.whenReady().then(createWindow);