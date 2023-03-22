//Chama para o remote acessar o serviço principal (main)
const main = require('@electron/remote').require('./main');
const controllerChamado = main.controllerChamado;
const ipc = window.require('electron').ipcRenderer;

  // convert status num in circles color
  const statusCirclesColort = (status) =>{
    if(status === 0){
      return gridjs.html('<i class="bi bi-code icon-status-open" data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada aberto!"></i>')
    }else if(status === 1){
      return gridjs.html('<i class="bi bi-code-slash icon-status-close"data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada concluido!"></i>')
    }else {
      return gridjs.html('<i class="bi bi-clock-history icon-status-wait" data-bs-toggle="tooltip" data-bs-placement="top" title="Chamada em espera de resposta!"></i>')
    }
  }

// Busca todos os chamados
let chamados = [];
const getChamadoAll = async () => {
    try {
      const result = await controllerChamado.getChamadoAll()
      
        result.map((chamado) => {
             chamados.push([chamado.id_chamado, 
              chamado.titulo_chamado,
              chamado.texto_chamado,
              chamado.data_chamado,
              chamado.atendente_chamado,
              chamado.pedido_chamado,
             statusCirclesColort(chamado.status)
       ])
      })
      console.log(chamados);
     await renderTable(chamados)
    } catch (error) {
      console.log(error);
      return {}
    }
  }



//rederiza a tabela 
const renderTable = async (chamados) => {
  const table = new gridjs.Grid({
    columns: ['Id','Titulo','Texto','Data','Atendente','A_pedido','Status'],
    data:chamados,
    sort: true,
    search:true,
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
  gridjs_head.innerHTML = `<button onClick="openChildWindowRegister()" class="gridjs-head-button">
                          <i class="bi bi-plus"></i>
                          </button>` 
}


//inicia todas funções
 async function Init(){
  await getChamadoAll();
  await captureButton();
 }
 Init();
//Abre a janela de registro
function openChildWindowRegister(){
    ipc.send('openChildWindowRegister');  
}

//Habilita o tooltip do bootstrap
 const captureButton = async () => {
    const teste = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    if(teste.length>0){
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
      })

    }else{
      setTimeout(async () => {
        await captureButton()
      }, "900");    
    }
                     
 


}