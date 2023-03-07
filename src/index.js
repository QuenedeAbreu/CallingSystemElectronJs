const {manWindow} = require('./main');
const {app}  = require('electron');
// Import Model 
const Chamados = require('./model/chamado');
// const {sequelize} = require('./database/sqlite3');

app.on('ready', () => {
  manWindow()
})

// Teste de Conexão com sqlite3
// const teste = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }
// teste(); 

// teste de consulta sqlite e sequilize
// const testeRead = async () => {
//   try {
//     const result = await Chamados.findAll();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// testeRead();



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})