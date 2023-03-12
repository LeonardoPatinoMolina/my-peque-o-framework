import { $, $$ } from "../../../../lib/utils.js";
import { Router } from "../../../router.js";

const itemsSubNav = $$('.subnav__list__item');
const itemsNav = $$('.nav__list__item');


/**
 * Listeners de la barra de navegación pricipal,
 * su porpósito es dar rinteractibilidad a la barra,
 * entre algunas de susu funciones, desplegar una barra secundaria
 * y gestionar sus opciones
 */
itemsNav.forEach(item=>{
  item.addEventListener("click", () => {
    if(item.dataset.link === 'home') Router.comeHome();
    if(item.dataset.link !== 'movies'){
      itemsSubNav.forEach(deselect);
      if($('.subnav').classList.contains('open_an')){
        $('.subnav').classList.remove('open_an');
        $('.subnav').classList.add('close_an');
      }
    }
    if (item.dataset.link === 'movies'){
      $('.subnav').classList.toggle('open_an');
      $('.subnav').classList.toggle('close_an');
    }
  });
})

itemsSubNav.forEach(item=>{
  item.addEventListener('click',()=>{
    if(item.dataset.opction === 'Popular'){
      Router.jumpToTree("popularmovies");
    }
    else if(item.dataset.opction === 'Mejores'){
      Router.jumpToTree("ratedmovies");
    }
    else if(item.dataset.opction === 'Próximamente'){
      Router.jumpToTree("upcomingmovies");
    }

    itemsSubNav.forEach(deselect)
    item.classList.add('selected')
  });
})
itemsNav.forEach(item=>{
  item.addEventListener('click',()=>{
    itemsNav.forEach(deselect);
    item.classList.add('selected');
  });
})

function deselect(item){
  item.classList.remove('selected')
}

