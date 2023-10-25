//Chama para o remote acessar o serviço principal (main)
const main = require('@electron/remote').require('./main');
const controllerChamado = main.controllerChamado;
const ipc = window.require('electron').ipcRenderer;
// const modal = bootstrap.Modal.getOrCreateInstance('#modalCadastrarEditar')
const btnFecharModalCadastro = document.getElementById("bottaoCloseModalCadastrar");
const btnFecharModalConfirmExcluir = document.getElementById('closeModalConfirmExcluir');


const showToast = (type, Title, content) => {
  const titleToast = document.querySelector('.title-toast');
  const bodyToast = document.querySelector('.body-toast');
  const iconToast = document.querySelector('.icon_toast_box');
  const toast = new bootstrap.Toast("#liveToast").show()
  if (type == 'success') {
    titleToast.innerHTML = `${Title}`
    bodyToast.innerHTML = `${content}`
    iconToast.innerHTML = `<i class="bi bi-check-circle-fill icon-toast-sucess"></i>`
  } else {
    titleToast.innerHTML = `${Title}`
    bodyToast.innerHTML = `${content}`
    iconToast.innerHTML = `<i class="bi bi-bug icon-toast-erro"></i>`
  }


}

//Togglee loading
const toggleLoading = () => {
  const screenLoading = document.querySelector('.loading-all')
  screenLoading.classList.toggle("loading-all-on");
}
//close  Modal
const closeModalCadastro = () => {
  btnFecharModalCadastro.click()
}

const closeModalConfirmExcluir = () => {
  btnFecharModalConfirmExcluir.click()
}


// convert status num in circles color
const statusCirclesColort = (status) => {
  if (status === 0) {
    return gridjs.html('<i class="bi bi-code icon-status-open" data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada aberto!"></i>')
  } else if (status === 1) {
    return gridjs.html('<i class="bi bi-clock-history icon-status-wait" data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada em espera de resposta!"></i>')
  } else {
    return gridjs.html('<i class="bi bi-code-slash icon-status-close"data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada concluido!"></i>')
  }
}

//Limit caracteres
function limitaStr(str, limite) {
  nova = ``;
  for (i = 0; i < limite; i++) {
    nova += str.substr(i, 1);
  }
  return nova + ' ...';
}

// Busca todos os chamados

const getChamadoAll = async () => {

  try {
    const result = await controllerChamado.getChamadoAll()
    return result
  } catch (error) {
    console.log(error);
    return {}
  }
}

const getChamadoOne = async (id) => {
  try {
    const result = await controllerChamado.getChamadoOne(id)
    return result
  } catch (error) {
    console.log(error);
    return {}
  }
}

//rederiza a tabela 
const renderTable = async () => {
  toggleLoading()
  const resultChamadoAll = await getChamadoAll();
  let chamados = [];


  for (var i = 0; resultChamadoAll.length > i; i++) {
    // console.log(resultChamadoAll[i]);
    chamados.push([resultChamadoAll[i].id_chamado,
    resultChamadoAll[i].titulo_chamado,
    limitaStr(resultChamadoAll[i].texto_chamado, 10),
    new Date(resultChamadoAll[i].data_chamado).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    resultChamadoAll[i].atendente_chamado,
    resultChamadoAll[i].pedido_chamado,
    statusCirclesColort(resultChamadoAll[i].status),
    gridjs.html(`<button aria-hidden="true" data-bs-toggle="modal" data-bs-target="#modalCadastrarEditar" class="button-action-edit" onClick="ValuesModalEdit(${resultChamadoAll[i].id_chamado})">
      <i class="bi bi-pen"></i></button>
  
      <button aria-hidden="true" data-bs-toggle="modal" data-bs-target="#excluirConfirmModal" class="button-action-delete" onClick="ValuesModalExcluir(${resultChamadoAll[i].id_chamado})">
      <i class="bi bi-trash"></i>    </button>
      
      `)
    ])
  }
  // resultChamadoAll.forEach((chamado) => {
  //   chamados.push([chamado.id_chamado,
  //   chamado.titulo_chamado,
  //   limitaStr(chamado.texto_chamado, 10),
  //   new Date(chamado.data_chamado).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
  //   chamado.atendente_chamado,
  //   chamado.pedido_chamado,
  //   statusCirclesColort(chamado.status),
  //   gridjs.html(`<button aria-hidden="true" data-bs-toggle="modal" data-bs-target="#modalCadastrarEditar" class="button-action-edit" onClick="ValuesModalEdit(${chamado.id_chamado})">
  // <i class="bi bi-pen"></i></button>

  // <button aria-hidden="true" data-bs-toggle="modal" data-bs-target="#excluirConfirmModal" class="button-action-delete" onClick="ValuesModalExcluir(${chamado.id_chamado})">
  // <i class="bi bi-trash"></i>    </button>

  // `)
  //   ])
  // })

  const table = new gridjs.Grid({
    columns: ['Id', 'Titulo', 'Texto', 'Data', 'Atendente', 'A_pedido', 'Status', { name: 'Ações', width: '85px' }],
    data: chamados,
    sort: true,
    search: true,
    pagination: {
      enabled: true,
      limit: 8
    },
    resizable: true,
    language: {
      search: {
        placeholder: 'Digite um termo de busca...'
      },
      pagination: {
        previous: 'Anterior',
        next: 'Próxima',
        showing: 'Mostrando',
        results: () => 'registros',
        of: 'de'
      },
      noResults: {
        header: 'Nenhum resultado',
        message: 'Não há resultados para a sua pesquisa.'
      },
      footer: {
        info: `Mostrando {{from}} até {{to}} de {{total}} registros`
      },

    },
    style: {
      table: {

      },
      tr: {

      },
      th: {
        'background-color': '#212529',
        color: '#000',
        'border-bottom': '3px solid #ccc',
        'text-align': 'center',
        padding: '10px 5px 5px 5px',
        color: "#FFF"
      },
      td: {
        'text-align': 'center',
        padding: "8px"
      },
      button: {
        color: "#fff"
      }
    }
  }).render(document.getElementById('table-wrapper'))

  //Inclusão do Botão para abrir o registro
  const gridjs_head = document.querySelector('.gridjs-head');
  gridjs_head.innerHTML = `<button aria-hidden="true" data-bs-toggle="modal" data-bs-target="#modalCadastrarEditar" class="gridjs-head-button" onClick="InfoCadastrarModal()">
                            <i class="bi bi-plus"></i>
                            </button>`
  toggleLoading()
}

//Abre a janela de registro
// function openChildWindowRegister(){
//     ipc.send('openChildWindowRegister');  
// }

const ValuesModalExcluir = async (id) => {
  const title_modal_excluir = document.querySelector('.title_modal_excluir');
  const submit_modal_excluir = document.querySelector('.submit_modal_excluir');
  const text_body_modal_excluir = document.querySelector('.text_body_modal_excluir');
  const resultChamado = JSON.parse(JSON.stringify(await getChamadoOne(id)));

  title_modal_excluir.innerHTML = 'Excluir Chamado';
  text_body_modal_excluir.innerHTML = `Deseja realmente excluir o chamado: <u>${resultChamado.id_chamado} - ${resultChamado.titulo_chamado}</u> ?`

  submit_modal_excluir.setAttribute('data-user', id)
}



const InfoCadastrarModal = () => {
  const title_modal = document.querySelector('.title_modal');
  const submit_modal = document.querySelector('.submit_modal');
  submit_modal.setAttribute('data-user', '0')

  title_modal.innerHTML = 'Novo Chamado';
  inputs[0].value = "";
  inputs[1].value = "";
  inputs[2].value = "";
  inputs[3].value = "";
  inputs[4].value = 3;
  inputs[5].value = "";
  submit_modal.innerHTML = ` <i class="bi bi-person-plus me-2"></i> Cadastrar`
}



const inputs = document.querySelectorAll('.input-focus');
const inputs_red = document.querySelectorAll('.input-focus-red');

const group_borders = document.querySelectorAll('.group-border');
const group_borders_red = document.querySelectorAll('.group-border-red');

const icon_inputs = document.querySelectorAll('.icon');
//Chamadas ao control passando pelo main
const cadastrarChamado = async (items) => {

  const montObject = {
    "titulo_chamado": items[0].value,
    "data_chamado": items[1].value,
    "atendente_chamado": items[2].value,
    "pedido_chamado": items[3].value,
    "status": items[4].value,
    "texto_chamado": items[5].value
  };


  try {

    toggleLoading();
    const teste = await controllerChamado.includeChamado(montObject)
    toggleLoading();
    showToast('success', 'Sucesso!', 'Chamado cadastrado com sucesso!');
    closeModalCadastro();
    setTimeout(() => { window.location.reload() }, 1500);
  } catch (error) {
    showToast('error', 'Erro!', 'Erro ao cadastrar o chamado!');
    console.log(error);
  }
}
// Editar chamado
const ValuesModalEdit = async (id) => {
  const title_modal = document.querySelector('.title_modal');
  const submit_modal = document.querySelector('.submit_modal');
  submit_modal.setAttribute('data-user', id)
  const resultChamado = JSON.parse(JSON.stringify(await getChamadoOne(id)));
  title_modal.innerHTML = `${resultChamado.titulo_chamado}`;
  inputs[0].value = resultChamado.titulo_chamado;
  inputs[1].value = resultChamado.data_chamado.split(' ')[0];
  inputs[2].value = resultChamado.atendente_chamado;
  inputs[3].value = resultChamado.pedido_chamado;
  inputs[4].value = resultChamado.status;
  inputs[5].value = resultChamado.texto_chamado;


  submit_modal.innerHTML = `<i class="bi bi-pen"></i> Editar`

  // console.log(resultChamado);
}

const editarChamado = async (id, chamado) => {
  const montObject = {
    "titulo_chamado": chamado[0].value,
    "data_chamado": chamado[1].value,
    "atendente_chamado": chamado[2].value,
    "pedido_chamado": chamado[3].value,
    "status": chamado[4].value,
    "texto_chamado": chamado[5].value
  };

  try {
    toggleLoading();
    const teste = await controllerChamado.editarChamado(id, montObject)
    toggleLoading();
    showToast('success', 'Sucesso!', 'Chamado editado com sucesso!');
    closeModalCadastro();

  } catch (error) {
    showToast('error', 'Erro!', 'Erro ao editar o chamado!');
    console.log(error);
  }
}


const deleteChamado = async () => {
  const submit_modal_excluir = document.querySelector('.submit_modal_excluir');
  const id = submit_modal_excluir.getAttribute('data-user');
  try {
    toggleLoading();
    const teste = await controllerChamado.deleteChamado(id)
    toggleLoading();
    showToast('success', 'Sucesso!', 'Chamado deletado com sucesso!');
    closeModalConfirmExcluir();
    setTimeout(() => { window.location.reload() }, 1500);
    // window.location.reload();

  } catch (error) {
    showToast('erro', 'Erro!', 'Erro ao deletar o chamado!');
    console.log(error);
  }
}

const focusBorderFocus = async (input, group_border, icon_input) => {
  input.addEventListener('focus', () => {
    group_border.style.cssText = 'border: 1px solid #7734FA !important;' +
      'box-shadow: 0 0 0 0.2rem rgba(117, 50, 250, 0.25) !important;' +
      'transition: all 0.5s;'
    if (icon_input) {
      icon_input.style.cssText = 'color:#7734FA !important;' +
        'transition: all 0.5s;'
    }
  })
  input.addEventListener('blur', () => {
    group_border.style.cssText = 'border: none !important;'
    if (icon_input) {
      icon_input.style.cssText = 'color:#FFF !important;'
    }
  })
}
//Chamada a função Aplicar border nos campos (Focus)
const activeFocusBoderFocus = () => {
  for (var i = 0; i < inputs.length; i++) {
    focusBorderFocus(inputs[i], group_borders[i], icon_inputs[i])
  }
}

//Validar o form de cadastro e cadastra novos chamados
document.getElementById('form_new-call').addEventListener('submit', async (e) => {
  e.preventDefault();
  const submit_modal = document.querySelector('.submit_modal');

  let count = 0
  inputs_red.forEach((item, key) => {
    if (item.value == "" || item.value == undefined) {
      group_borders_red[key].style.cssText = 'border:1px solid red !important;'
    } else {
      count++
      group_borders_red[key].style.cssText = 'border:none !important;'
      // console.log(item.getAttribute("aria-label") + " : " + item.value);
    }
  })

  if (inputs_red.length == count) {
    if (submit_modal.getAttribute('data-user') == 0) {
      cadastrarChamado(inputs)
      setTimeout(() => { window.location.reload() }, 1500);
      // renderTable();
    } else {
      editarChamado(submit_modal.getAttribute('data-user'), inputs)
      // renderTable();
      setTimeout(() => { window.location.reload() }, 1500);
    }
  }
})

//Habilita o tooltip do bootstrap
const captureButton = async () => {
  const iconsStatusTable = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  // const textoTable = document.querySelectorAll('.texto-chamado-table')
  // console.log(textoTable);
  if (iconsStatusTable.length > 0) {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

  } else {
    setTimeout(async () => {
      await captureButton()
    }, "900");
  }
}

//inicia todas funções
async function Init() {
  await renderTable();
  await captureButton();
  activeFocusBoderFocus();
}
Init();


function pageTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();