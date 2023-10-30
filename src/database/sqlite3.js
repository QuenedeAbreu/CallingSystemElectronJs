const path = require('node:path');
//console.log(path.resolve(__dirname, 'src/database/db.sqlite'));
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'db.sqlite')
})

module.exports = { sequelize };