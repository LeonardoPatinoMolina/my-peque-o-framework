import { Rule } from "../lib/leoframe.js";
import { $, $$ } from "../lib/utils.js";
import { Router } from "../pages/router.js";

export const NavRule = (component)=>{
  
  const addItemsListener = ()=>{
    window.addEventListener('click',handlePrincipal)
  }
  
  const removeItemsListener = ()=>{
    window.removeEventListener('click',handlePrincipal)
  }
  
  return new Rule({
    adders: [
      addItemsListener
    ],
    removers: [
      removeItemsListener
    ]
  });
} 

//utils-----------------------------------------------
function handlePrincipal({target}){
  if(target.dataset?.link){
    handleClickItem(target);
  }else{
    closeSubMenu();
    // deselectItems();
  }
}
function handleClickItem(item){
  const subnavShowsCls = $(".subnav_shows").classList;
  const subnavMoviesCls = $(".subnav_movies").classList;
  
  if (item.dataset.link === "home" || item.dataset.link === "about") {
    if(subnavShowsCls.contains("open_an")){
      subnavShowsCls.remove("open_an");
      subnavShowsCls.add("close_an");
    }
    if(subnavMoviesCls.contains("open_an")){
      subnavMoviesCls.remove("open_an");
      subnavMoviesCls.add("close_an");
    }
    $$('.subnav_movies__list__item').forEach((item)=>{
      if (item.dataset.link === "home") {
        item.classList.add('selected')
      }else{
        item.classList.remove('selected')
      }
    })

    Router.jumpToTree(item.dataset.link);
  }
  //desplegamos la barra secundaria de peliculas si
  if (item.dataset.link === "movies") {

    //cerramos la subnav anterior
    if (subnavShowsCls.contains("open_an")) {
      subnavShowsCls.remove("open_an");
      subnavShowsCls.add("close_an");
    }
    //cerramos porcedemos a cerrar o abrir respectivamente
    if (subnavMoviesCls.contains("open_an")) {
      subnavMoviesCls.remove("open_an");
      subnavMoviesCls.add("close_an");
    }else{
      subnavMoviesCls.remove("close_an");
      subnavMoviesCls.add("open_an");
    }
  }
  
  //desplegamos la barra secundaria de series si
  if (item.dataset.link === "shows") {
    if (subnavMoviesCls.contains("open_an")) {
      subnavMoviesCls.remove("open_an");
      subnavMoviesCls.add("close_an");
    }
    //cerramos porcedemos a cerrar o abrir respectivamente
    if (subnavShowsCls.contains("open_an")) {
      subnavShowsCls.remove("open_an");
      subnavShowsCls.add("close_an");
    }else{
      subnavShowsCls.remove("close_an");
      subnavShowsCls.add("open_an");
    }
  }

}//end handle

function closeSubMenu(){
  const subnavShowsCls = $(".subnav_shows").classList;
  const subnavMoviesCls = $(".subnav_movies").classList;

  if(subnavShowsCls.contains('open_an')){
    subnavShowsCls.remove("open_an");
    subnavShowsCls.add("close_an");
  }
  if(subnavMoviesCls.contains('open_an')){
    subnavMoviesCls.remove("open_an");
    subnavMoviesCls.add("close_an");
  }
}