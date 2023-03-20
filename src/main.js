const {  BrowserWindow, ipcMain  } = require('electron')
const { app } = require('@electron/remote/main');
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

// Função para criar janela filha da principal
const createChildWindowRegister = () => {
  const childWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    modal: true,
    show: false,
    parent: mainWindow, // Make sure to add parent window here
  
    // Make sure to add webPreferences with below configuration
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  
  // ativa o remote 
  require('@electron/remote/main').enable(childWindow.webContents)
  // Carrega a pagina de regitro
  childWindow.loadFile("src/ui/register.html");
  
  childWindow.on("ready-to-show", () => {
    childWindow.show();
  });
}

// Function para a chamar a janela de registro
ipcMain.on("openChildWindowRegister", (event, arg) => {
  createChildWindowRegister();
});


//Fecha a janela que chamar a função
ipcMain.on('closeChildWindowRegister', function (event) {
  const window = event.sender.getOwnerBrowserWindow()
  if (window) {
    window.close()
  }
  event.returnValue = null
})


module.exports = {
  mainWindow,
  controllerChamado
}

