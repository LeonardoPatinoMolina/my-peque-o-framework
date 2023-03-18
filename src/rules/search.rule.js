import { Modal, ResultsCards } from "../pages/layout/modal/Modal.js";

export const SearchRule =(component)=>{
  
  const addInputListener = ()=>{
    const input = component.body.querySelector('.search__input_text');

    input.focus()
    input.setSelectionRange(input.value.length, input.value.length);
    input.addEventListener('input', (e)=> handleInput(e,component));
  }
  
  const removeInputListener = ()=>{
    const input = component.body.querySelector('.search__input_text');

    input.removeEventListener('input', handleInput);
  }

  const addBtnCloseListener = () =>{
    const btn = component.body.querySelector('#btn_close_modal');
    
    btn.addEventListener('click', (e)=> handleBtnClick(e, component));
  }
 
  const removeBtnCloseListener = () =>{
    const btn = component.body.querySelector('#btn_close_modal');
    
    btn.removeEventListener('click', (e)=> handleBtnClick(e, component));
  }

  return {
    add: [
      addInputListener,
      addBtnCloseListener
    ],
    remove: [
      removeInputListener,
      removeBtnCloseListener
    ]
  }
}

//utils---------------------------------------------
function handleInput(e,component) {
  //if(currentTarget.value.length < 2) return;
  //if(currentTarget.value === " ") return;
  //whait(currentTarget.value)
    component.update({value: e.currentTarget.value})
  
}
/**
 * timer de espera antes de cada consulta, la idea
 * es evitar saturar las consultas de forma que no se
 * disparen hasta que el usaurio haga una paua de 600 ms
 */
let timer = setTimeout(()=>{},10)
function whait(input) {
  clearTimeout(timer)
  timer = setTimeout(()=>{
    ResultsCards.update({query: input})
  }, 600)
}


function handleBtnClick(e, component) {
  component.props.value = '';
  Modal.remove();
}