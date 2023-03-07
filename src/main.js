const {  BrowserWindow } = require('electron')
const controllerChamado  = require('./controller/controller.chamado');
require('@electron/remote/main').initialize();

const mainWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  require('@electron/remote/main').enable(win.webContents)
  win.loadFile('src/ui/index.html')
}



module.exports = {
  mainWindow,
  controllerChamado
}

