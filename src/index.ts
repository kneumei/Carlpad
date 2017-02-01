import { app, BrowserWindow, ipcMain } from 'electron';

import {CarlpadConnectionConfig} from './carlpad-connection-config';

import {Socket, createConnection} from 'net';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | null;
let socket: Socket;

const isDevMode = process.execPath.match(/[\\/]electron/);

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('connect', (event, config: CarlpadConnectionConfig) =>{
  if(config.connectionType === 'wifi'){
    socket = connectWifi(config.wifiIp, config.wifiPort, event)
  } else if (config.connectionType === 'serial'){

  }
 
});

ipcMain.on('disconnect', () =>{
  socket.destroy();
})

let connectWifi = function(ip: string, port: number, event: any): Socket{
   let socket = createConnection({host : ip, port: port});
    socket.on('connect', () => event.sender.send('onConnected'));
    socket.on('error', (err) => event.sender.send('onError', err));
    socket.on('close', () => event.sender.send('onDisconnected'))
    return socket;
}


