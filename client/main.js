'use strict';

/* eslint-disable no-console */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const DiscordRPC = require('../');
require('dotenv').config()

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 340,
    height: 380,
    resizable: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// don't change the client id if you want this example to work
const clientId = "335050699920375808";

// only needed for discord allowing spectate, join, ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();
async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }
//r(t) = R(t)/N
  const titre = await mainWindow.webContents.executeJavaScript('window.titre_text');
  const details = await mainWindow.webContents.executeJavaScript('window.details_text');
  const image_big_key = await mainWindow.webContents.executeJavaScript('window.image_big_key');
  const image_big_words = await mainWindow.webContents.executeJavaScript('window.image_big_words');
  const image_small_key = await mainWindow.webContents.executeJavaScript('window.image_small_key');
  const image_small_words = await mainWindow.webContents.executeJavaScript('window.image_small_words');

  rpc.setActivity({
    details: `${titre}`,
    state: `${details}`,
    startTimestamp,
    largeImageKey: `${image_big_key}`,
    largeImageText: `${image_big_words}`,
    smallImageKey: `${image_small_key}`,
    smallImageText: `${image_small_words}`,
    instance: false,
  });
}

rpc.on('ready', () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 15e3);
});

rpc.login({ clientId }).catch(console.error);
