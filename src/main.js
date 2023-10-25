const { BrowserWindow, ipcMain, Menu } = require('electron')
const controllerChamado = require('./controller/controller.chamado');
require('@electron/remote/main').initialize();

const mainWindow = () => {
  let menuPrincipal = Menu.buildFromTemplate([
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    { type: 'separator' },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }

      ]
    },

    { type: 'separator' },
    {
      role: 'help',
      submenu: [
        {
          label: 'Quenede Abreu',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://wa.me/5568999655360?text=Queria%ajuda%com%o%Organizer!')
          }
        }
      ]
    }


  ]);
  Menu.setApplicationMenu(menuPrincipal);
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
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
// ipcMain.on("openChildWindowRegister", (event, arg) => {
//   createChildWindowRegister();
// });

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

