import { $ } from "../../../../lib/utils.js";
import { Router } from "../../../router.js";
import { Modal, resultsVolatileComponent } from "../Modal.js";

//input de texto de busqueda de modal
const inputSearch = $('.search__input_text');

/**
 * timer de espera antes de cada consulta, la idea
 * es evitar saturar las consultas de forma que no se
 * disparen hasta que el usaurio haga una paua de 600 ms
 */
let timer = setTimeout(()=>{},10)
const whait = (input) => {
  clearTimeout(timer)
  timer = setTimeout(()=>{
    console.log(input);
    resultsVolatileComponent.update({newProps:{query: input}})
  }, 600)
}

window.addEventListener('searching',({target})=>{
  let inputV = 'a';
  // if(target.value !== '')inputV = target.value
  // whait(inputV);
  console.log('epa');
})


// reglas para evento globales ------------

window.addEventListener("cardclick", ({ detail }) => {
  if(detail.dataset.type !== 'movie') return;
  Modal.remove()
  Router.jumpToTree("movie", {id: detail.id});
  window.scrollTo(0,0);
});

window.addEventListener('modalclose',()=>{
    Modal.remove()
})