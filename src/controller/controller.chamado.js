// Import Model 
const Chamados = require('../model/chamado');

const convertDateToDaysToDate = (dateCall) => {
  const dateNow = new Date();
  const dateCallConvert = new Date(dateCall);
  const dateDiff = dateNow - dateCallConvert;
  const days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  if (days >= 7) {
    const calc = days / 7
    return `${Math.trunc(calc)} Semana(s)`;
  } else {
    return `${Math.trunc(days)} Dia(s)`;
  }
}



// Get all Chamados
const getChamadoAll = async () => {
  try {
    const results = await Chamados.findAll({
      order: [
        ['status', 'ASC'],
        ['id_chamado', 'DESC']
      ]
    });
    results.map((item) => {
      item['tempo_abertura'] = convertDateToDaysToDate(item.data_chamado)
    })
    // console.log(results);
    //convertDateToDaysToDate(results[0].data_chamado)
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