import { Rule } from "../lib/leoframe.js";
import { $, $$ } from "../lib/utils.js";
import { Router } from "../pages/router.js";

export const NavRule = (component)=>{
  
  const addItemsListener = ()=>{
    const items = component.body.querySelectorAll(".nav__list__item");
    
    items.forEach((item) => {
      item.addEventListener("click", () => handleClickItem(item));
    });
  }
  
  const removeItemsListener = ()=>{
    const items = component.body.querySelectorAll(".nav__list__item");
    items.forEach((item) => {
      item.removeEventListener("click", () => handleClickItem(item));
    });
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

function deselect(item) {
  item.classList.remove("selected");
}