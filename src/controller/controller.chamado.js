// Import Model 
const Chamados = require('../model/chamado');

// Get all Chamados
 const getChamadoAll = async () => {
  try {
    const result = await Chamados.findAll();
     console.log(result[0]);
  } catch (error) {
    console.log(error);
  }
}

const teste =()=>{
  console.log('hellow word');
}

module.exports = {
  getChamadoAll,
  teste
}