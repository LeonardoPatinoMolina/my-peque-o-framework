import { Rule } from "../lib/leoframe.js";
import { $, $$ } from "../lib/utils.js";
import { Modal } from "../pages/layout/modal/Modal.js";
import { Router } from "../pages/router.js";

/**
 * 
 * @param {Component} component 
 * @returns {Rule}
 */
export const HeaderRule = (component)=>{

  const addTitleListener = () =>{
    const title = component.body.querySelector('.header__title');

    title.addEventListener('click',()=>{
      component.body.querySelectorAll('.nav__list__item').forEach((item)=>{
        if(item.dataset.link !== 'home') item.classList.remove('selected');
        else item.classList.add('selected')
      })
      deselectItems();
      Router.comeHome();
    });
  }

  const removeTitleListener = () =>{
    const title = component.body.querySelector('.header__title');

    title.removeEventListener('click',()=>{
      component.body.querySelectorAll('.nav__list__item').forEach((item)=>{
        if(item.dataset.link !== 'home') item.classList.remove('selected');
        else item.classList.add('selected')
      })
      deselectItems();
      Router.comeHome();
    });
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

  return new Rule({
    adders: [
      addTitleListener,
      addItemsNav,
      addTriggerModalListener
    ], 
    removers: [
      removeTitleListener,
      removeItemsNav,
      removeTriggerModalListener
    ]
  });
}

//utils
function handleModal() {
  Modal.render().then(()=>{
    $('.modal').classList.add('coldDown_an');
    $('.modal_wrapper').style.display = 'flex';
  })
}

function handleCLickItem(item, items) {
  if(item.dataset.link === 'movies' || item.dataset.link === 'shows' ) return;
  items.forEach(deselect);
  item.classList.add("selected");
}

function deselect(item) {
  item.classList.remove("selected");
}

function deselectItems() {
  const movies = $$('.subnav_movies__list__item');
  const shows = $$('.subnav_shows__list__item');
  for (let i = 0; i < 3; i++) {
    movies[i].classList.remove("selected");
    shows[i].classList.remove("selected");
  };
}