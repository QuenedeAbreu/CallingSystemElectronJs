const {Sequelize}  = require('Sequelize');
const {sequelize} = require('../database/sqlite3');

const Chamados = sequelize.define('chamados',{
  id_chamado:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  titulo_chamado:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  texto_chamado:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  data_chamado:{
    type: Sequelize.DATE,
    allowNull: false
  },
  atendente_chamado:{
    type: Sequelize.TEXT
  },
  pedido_chamado:{
    type: Sequelize.TEXT
  },
  status:{
    type:Sequelize.INTEGER,
    allowNull: false
  }

});

module.exports = Chamados;