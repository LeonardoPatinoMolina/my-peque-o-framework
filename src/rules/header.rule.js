import { $ } from "../lib/utils.js";
import { Modal } from "../pages/layout/modal/Modal.js";
import { Router } from "../pages/router.js";

export const HeaderRule = (component)=>{

  const addTitleListener = () =>{
    const title = component.body.querySelector('.header__title');

    title.addEventListener('click',()=>Router.comeHome());
  }

  const removeTitleListener = () =>{
    const title = component.body.querySelector('.header__title');

    title.removeEventListener('click',()=>Router.comeHome());
  }

  const addTriggerModalListener = ()=>{
    const triggerModal = component.body.querySelector('.header__boton');

    triggerModal.addEventListener('click', handleModal);
  }
  
  const removeTriggerModalListener = ()=>{
    const triggerModal = component.body.querySelector('.header__boton');

    triggerModal.removeEventListener('click', handleModal);
  }

  const addItemsNav = () =>{
    const items = component.body.querySelectorAll('.nav__list__item');

    items.forEach((item)=>{
      item.addEventListener('click', ()=> handleCLickItem(item, items))
    });
  }
  const removeItemsNav = () =>{
    const items = component.body.querySelectorAll('.nav__list__item');

    items.forEach((item)=>{
      item.removeEventListener('click', ()=> handleCLickItem(item, items))
    });
  }

  const addListenersManagment = [
    addTitleListener,
    addItemsNav,
    addTriggerModalListener
  ]
  const removeListenersManagment = [
    removeTitleListener,
    removeItemsNav,
    removeTriggerModalListener
  ]
  return {
    add: addListenersManagment.forEach(a=>{ a() }),
    remove: removeListenersManagment.forEach(r=>{ r() })
  }

}

//utils
function handleModal() {
  Modal.render().then(()=>{
    $('.modal').classList.add('coldDown_an');
    $('.modal_wrapper').style.display = 'flex';
  })
}

function handleCLickItem(item, items) {
  items.forEach(deselect);
  item.classList.add("selected");
}

function deselect(item) {
  item.classList.remove("selected");
}
