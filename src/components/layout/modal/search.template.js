import { Component } from "../../../lib/leoframe.js";
import { Modal, ResultsCards } from "../../../pages/layout/modal/Modal.js"; 

/**
 * timer de espera antes de cada consulta, la idea
 * es evitar saturar las consultas de forma que no se
 * disparen hasta que el usaurio haga una paua de 600 ms
 */
let timer = setTimeout(()=>{},10)
const whait = (input) => {
  clearTimeout(timer)
  timer = setTimeout(()=>{
    ResultsCards.update({newProps:{query: input}})
  }, 600)
}

const handleInput = ({currentTarget})=>{
  if(currentTarget.value === '') return;
  whait(currentTarget.value)
}

const handleBtnClick = ()=>{
  Modal.remove();
}


export class SearchComponent extends Component {
  name = 'search';
  props = { logo: "close" };
  
  $didMount = async ()=> {
    this.body.querySelector('.search__input_text').addEventListener('input', handleInput);

    this.body.querySelector('#btn_close_modal').addEventListener('click', handleBtnClick);
  }
  $didUnmount = async ()=> {
    this.body.querySelector('.search__input_text').removeEventListener('input', handleInput);
    
    this.body.querySelector('#btn_close_modal').removeEventListener('click', handleBtnClick);
  }
  
  template = `
  <div class="search">
    <input
      placeholder="search" 
      class="search__input_text"
      autocomplete="off"
    >
    <span 
      id="btn_close_modal"
      class="btn_modal search__logo material-symbols-rounded"
    >
    {logo}
  </span>
  </div>
  `;
}