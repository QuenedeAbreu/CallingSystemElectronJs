// Import Model 
const Chamados = require('../model/chamado');

// Get all Chamados
const getChamadoAll = async () => {
  try {
    const results = await Chamados.findAll({
      order: [
        ['status', 'ASC'],
        ['id_chamado', 'DESC']
      ]
    });
    return results
  } catch (error) {
    console.log(error);
    return {}
  }
}

const getChamadoOne = async (id) => {
  try {
    const result = await Chamados.findByPk(id);
    return result
  } catch (error) {
    console.log(error);
    return {}
  }
}

const includeChamado = async (chamado) => {

  try {
    const results = await Chamados.create(chamado);
    return results;
  } catch (error) {
    console.log(error);
    return {}
  }
}

const editarChamado = async (id, chamado) => {
  try {
    const results = await Chamados.update(chamado, { where: { id_chamado: id } });
    return results;
  } catch (error) {
    console.log(error);
    return {}
  }

}

const deleteChamado = async (id) => {
  try {
    const results = await Chamados.destroy({ where: { id_chamado: id } });
    return results;
  }
  catch (error) {
    console.log(error);
    return {}
  }

}

module.exports = {
  getChamadoAll,
  includeChamado,
  getChamadoOne,
  editarChamado,
  deleteChamado
}