const {  BrowserWindow } = require('electron')


const manWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration: true
    }
  })
  win.loadFile('src/ui/index.html')
}

module.exports = {
  manWindow
}

