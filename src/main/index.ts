import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import { homedir } from 'os'
import server from '../server'

const serverApp = server()

let win: BrowserWindow | null

const installExtensions = async () => {
  installExtension(REACT_DEVELOPER_TOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))
  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension:  ${name}`))
    .catch(err => console.log('An error occurred: ', err))
}

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    installExtensions()
  }

  win = new BrowserWindow({
    width: 1152,
    height: 648,
    minWidth: 800,
    minHeight: 600,
    title: 'Quintals',
    show: false,
    frame: false,
    backgroundColor: '#202020',
    webPreferences: {
      webSecurity: false
    }
  })

  if (process.env.NODE_ENV !== 'production') {
    win.loadURL(
      url.format({
        protocol: 'http:',
        host: 'localhost:4444',
        pathname: 'app.html',
        slashes: true
      })
    )
  } else {
    win.loadURL(
      url.format({
        protocol: 'file:',
        pathname: path.join(app.getAppPath(), 'build/app.html'),
        slashes: true
      })
    )
  }

  await serverApp.ready()

  win.show()

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    win = null
    serverApp.close(() => {})
  })
}

ipcMain.setMaxListeners(0)

app.setPath('userData', path.resolve(homedir(), '.quintals'))

// Bypass Web Audio autoplay policy
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  serverApp.close(() => {})
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
