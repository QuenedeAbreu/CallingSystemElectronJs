const ipc = window.require('electron').ipcRenderer;

function openChildWindowRegister(){
    ipc.send('openChildWindowRegister');  
}



const chamados = [
  { id: 1, nome: 'João', email: 'joao@example.com', telefone: '(11) 1234-5678', status: 'Aberto' ,ações:gridjs.html(`<i class="bi bi-pencil-square text-primary mr-3"></i><i class="bi bi-x-square text-danger" alt="Excluir"></i>`) },
  { id: 2, nome: 'Maria', email: 'maria@example.com', telefone: '(11) 9876-5432', status: 'Fechado' },
  { id: 3, nome: 'Pedro', email: 'pedro@example.com', telefone: '(11) 5555-5555', status: 'Pendente' }
];

const table = new gridjs.Grid({
  columns: ['ID', 'Nome', 'Email', 'Telefone', 'Status','Ações'],
  data: chamados,
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
      padding: 0
    },
    button: {
      color: "#fff"
    }
  }
}).render(document.getElementById('table-wrapper'));

const gridjs_head = document.querySelector('.gridjs-head');
gridjs_head.innerHTML = `<button onClick="openChildWindowRegister()" class="gridjs-head-button">
                          <i class="bi bi-plus"></i>
                          </button>`