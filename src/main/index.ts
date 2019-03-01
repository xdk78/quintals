import { app, BrowserWindow, session } from 'electron'
import * as path from 'path'
import * as url from 'url'

let win: BrowserWindow | null
let loading: BrowserWindow | null

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(console.log)
}

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions()
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

  loading = new BrowserWindow({
    width: 350,
    height: 350,
    resizable: false,
    title: 'Quintals',
    show: false,
    frame: false,
    backgroundColor: '#202020'
  })

  loading.once('show', () => {
    win.webContents.once('dom-ready', () => {
      win.show()
      loading.hide()
      loading.close()
    })

    if (process.env.NODE_ENV !== 'production') {
      loading.loadURL(
        url.format({
          protocol: 'http:',
          host: 'localhost:8080',
          pathname: 'loading.html',
          slashes: true
        })
      )
      win.loadURL(
        url.format({
          protocol: 'http:',
          host: 'localhost:8080',
          pathname: 'index.html',
          slashes: true
        })
      )
    } else {
      loading.loadURL(
        url.format({
          pathname: path.join(__dirname, 'loading.html'),
          protocol: 'file:',
          slashes: true
        })
      )
      win.loadURL(
        url.format({
          pathname: path.join(__dirname, 'index.html'),
          protocol: 'file:',
          slashes: true
        })
      )
    }
  })

  loading.show()

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    win = null
  })
}

// Bypass Web Audio autoplay policy
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
