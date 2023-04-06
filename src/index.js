const {mainWindow } = require('./main');
const {app}  = require('electron');
// const {sequelize} = require('./database/sqlite3');
// const {teste} = require('./controller/controller.chamado');
app.disableHardwareAcceleration()
app.on('ready', () => {
  mainWindow()
})



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})