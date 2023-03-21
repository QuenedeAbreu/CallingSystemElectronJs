// Import Model 
const Chamados = require('../model/chamado');

// Get all Chamados
 const getChamadoAll = async () => {
  try {
    const results = await Chamados.findAll();
    return results
  } catch (error) {
    console.log(error);
    return {}
  }
}


module.exports = {
  getChamadoAll
}