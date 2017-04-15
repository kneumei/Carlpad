import { app, BrowserWindow, ipcMain } from 'electron';
import { Socket, createConnection } from 'net';
const settings = require('electron-settings');
import * as _ from 'lodash';

import { ConnectionConfig } from './models/connection-config';
import { CarlpadGamepadConfig } from './models/gamepad-config';
import { CarlpadAxisConfig } from './models/axis-config'

const isDevMode = process.execPath.match(/[\\/]electron/);
let mainWindow: Electron.BrowserWindow | null;
let socket: Socket;

const defaultGamepadSettings = new CarlpadGamepadConfig();
defaultGamepadSettings.id = "Rock Candy Gamepad for PS3 (Vendor: 0e6f Product: 011e)";
defaultGamepadSettings.axes = [
  new CarlpadAxisConfig(1, true, false),
  new CarlpadAxisConfig(5, true, false)
]

const defaultConnectionConfig = new ConnectionConfig();
defaultConnectionConfig.connectionType = 'wifi';
defaultConnectionConfig.wifiIp = "127.0.0.1";
defaultConnectionConfig.wifiPort = 1234;

const createWindow = async () => {
  let appSettings = settings.getAll();
  mainWindow = new BrowserWindow({
    width: _.get(appSettings, 'window.width', 1400),
    height: _.get(appSettings, 'window.height', 800),
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    title: "Carlpad",
    x: _.get(appSettings, 'window.x', undefined),
    y: _.get(appSettings, 'window.y', undefined)
  });

  console.log(settings.file());

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.on('move', _.debounce(saveWindowPosition, 150));

};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('connect', (event, config: ConnectionConfig) => {
  if (config.connectionType === 'wifi') {
    socket = connectWifi(config, event)
  } else if (config.connectionType === 'serial') {

  }
});

ipcMain.on('disconnect', () => {
  socket.destroy();
})

ipcMain.on('loadConnectionConfig', (event) => {
  let connectionConfig = settings.get('connectionConfig')
  event.sender.send('onLoadConnectionConfig', connectionConfig || defaultConnectionConfig);
})

ipcMain.on('loadGamepadConfig', (event) => {
  let gamepadConfig = settings.get('gamepadConfig')
  event.sender.send('onLoadGamepadConfig', gamepadConfig || defaultGamepadSettings);
})

ipcMain.on('send', (event: any, data: string) => {
  socket.write(data + "\n");
})

ipcMain.on('saveGamepadConfiguration', (event: any, gamepadConfig: CarlpadGamepadConfig) => {
  settings.set("gamepadConfig", gamepadConfig, { prettify: true });
});

ipcMain.on('resetGamepadConfig', (event) => {
  settings.delete("gamepadConfig");
  event.sender.send('onLoadGamepadConfig', defaultGamepadSettings);
});

let connectWifi = function (config: ConnectionConfig, event: any): Socket {
  let socket = createConnection({ host: config.wifiIp, port: config.wifiPort });
  socket.on('connect', () => {
    settings.set('connectionConfig', config, { prettify: true });
    event.sender.send('onConnected')
  });
  socket.on('error', (err) => event.sender.send('onError', err));
  socket.on('close', () => event.sender.send('onDisconnected'))
  return socket;
}

let saveWindowPosition = function (): void {
  if (!mainWindow) return;
  const newPosition = mainWindow.getPosition();
  const windowSize = mainWindow.getSize();
  settings.set("window", {
    "width": windowSize[0],
    "height": windowSize[1],
    "x": newPosition[0],
    "y": newPosition[1]
  }, { prettify: true });
}

