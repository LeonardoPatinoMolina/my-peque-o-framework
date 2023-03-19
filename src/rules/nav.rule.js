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
  
  if (item.dataset.link === "home") Router.comeHome();
  //desplegamos la barra secundaria de peliculas si
  if (item.dataset.link === "movies") {
    const itemsSubNavMovies = $$(".subnav_movies__list__item");
    //deseleccionamos cualquier opcion previamente sleccioanda
    itemsSubNavMovies.forEach(deselect);
    //cerramos la subnav anterior
    if (subnavShowsCls.contains("open_an")) {
      subnavShowsCls.remove("open_an");
      subnavShowsCls.add("close_an");
    }
    //cerramos porcedemos a cerrar o abrir respectivamente
    subnavMoviesCls.toggle("open_an");
    subnavMoviesCls.toggle("close_an");
  }
  
  //desplegamos la barra secundaria de series si
  if (item.dataset.link === "shows") {
    const itemsSubNavShows = $$(".subnav_shows__list__item");
    //deseleccionamos cualquier opcion previamente sleccioanda
    itemsSubNavShows.forEach(deselect);
    //cerramos la subnav anterior
    if (subnavMoviesCls.contains("open_an")) {
      subnavMoviesCls.remove("open_an");
      subnavMoviesCls.add("close_an");
    }
    //cerramos porcedemos a cerrar o abrir respectivamente
    subnavShowsCls.toggle("open_an");
    subnavShowsCls.toggle("close_an");
  }

  //about
  if (item.dataset.link === "about") {
    Router.jumpToTree("about");
  }
}//end handle

function deselect(item) {
  item.classList.remove("selected");
}