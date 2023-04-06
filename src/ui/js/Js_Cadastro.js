//Chama para o remote acessar o serviço principal (main)
const main = require('@electron/remote').require('./main');
const controllerChamado = main.controllerChamado;
const ipc = window.require('electron').ipcRenderer;

const inputs = document.querySelectorAll('.input-focus');
const group_borders = document.querySelectorAll('.group-border');
const icon_inputs = document.querySelectorAll('.icon');
//Chamadas ao control passando pelo main
const include= async (items) => {
 
  const montObject = {
    "titulo_chamado":items[0].value,
    "data_chamado":items[1].value,
    "atendente_chamado":items[2].value,
    "pedido_chamado":items[3].value,
    "status":items[4].value,
    "texto_chamado":items[5].value
  };


  try {
    const teste = await controllerChamado.includeChamado(montObject)
    
    
  } catch (error) {
    console.log(error);
  }
}


const focusBorderHover = async (input, group_border, icon_input) => {
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
for (var i = 0; i < inputs.length; i++) {
  focusBorderHover(inputs[i], group_borders[i], icon_inputs[i])
}

document.getElementById('form_new-call').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  let count = 0
  inputs.forEach((item, key) => {
    if (item.value == "" || item.value == undefined) {
      group_borders[key].style.cssText = 'border:1px solid red !important;'
    } else {
      count++
      group_borders[key].style.cssText = 'border:none !important;'
      // console.log(item.getAttribute("aria-label") + " : " + item.value);
    }
  })
 
  if (inputs.length == count) {
    include(inputs)
    console.log('Validado!');
  } else {
    console.log('Não valido!');
   
    
  }
})