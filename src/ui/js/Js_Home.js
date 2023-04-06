//Chama para o remote acessar o serviço principal (main)
const main = require('@electron/remote').require('./main');
const controllerChamado = main.controllerChamado;
const ipc = window.require('electron').ipcRenderer;
// const modal = bootstrap.Modal.getOrCreateInstance('#modalCadastrarEditar')
const meuBotao = document.getElementById("bottaoCloseModalCadastrar");


const showToast = () => {
  const titleToast = document.querySelector('.title-toast');
  const bodyToast = document.querySelector('.body-toast');
  const toast = new bootstrap.Toast("#liveToast").show()
  titleToast.innerHTML = `Sucesso!`
  bodyToast.innerHTML = `Chamado cadastrado com sucesso!`

}

//Togglee loading
const toggleLoading = () => {
  const screenLoading = document.querySelector('.loading-all')
  screenLoading.classList.toggle("loading-all-on");
}
//close  Modal
const closeModal = () => {
  meuBotao.click()
}


// convert status num in circles color
const statusCirclesColort = (status) => {
  if (status === 0) {
    return gridjs.html('<i class="bi bi-code icon-status-open" data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada aberto!"></i>')
  } else if (status === 1) {
    return gridjs.html('<i class="bi bi-code-slash icon-status-close"data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada concluido!"></i>')
  } else {
    return gridjs.html('<i class="bi bi-clock-history icon-status-wait" data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada em espera de resposta!"></i>')
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
  resultChamadoAll.map(async (chamado) => {
    chamados.push([chamado.id_chamado,
    chamado.titulo_chamado,
    limitaStr(chamado.texto_chamado, 10),
    new Date(chamado.data_chamado).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    chamado.atendente_chamado,
    chamado.pedido_chamado,
    statusCirclesColort(chamado.status),
    gridjs.html(`<button aria-hidden="true" data-bs-toggle="modal" data-bs-target="#modalCadastrarEditar" class="button-action-edit" onClick="EditChamado(${chamado.id_chamado})">
    <i class="bi bi-pencil-square"></i>
    </button>`)
    ])
  })
  const table = new gridjs.Grid({
    columns: ['Id', 'Titulo', 'Texto', 'Data', 'Atendente', 'A_pedido', 'Status', 'Ações'],
    data: chamados,
    sort: true,
    search: true,
    pagination: {
      enabled: true,
      limit: 10
    },
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
  gridjs_head.innerHTML = `<button aria-hidden="true" data-bs-toggle="modal" data-bs-target="#modalCadastrarEditar" class="gridjs-head-button">
                          <i class="bi bi-plus"></i>
                          </button>`
  toggleLoading()
}
//Abre a janela de registro
// function openChildWindowRegister(){
//     ipc.send('openChildWindowRegister');  
// }

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
    showToast();
    closeModal();

  } catch (error) {
    console.log(error);
  }
}
// Editar chamado
const EditChamado = async (id) => {
  const resultChamado = JSON.parse(JSON.stringify(await getChamadoOne(id)))
  console.log(resultChamado);
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
    cadastrarChamado(inputs)
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

