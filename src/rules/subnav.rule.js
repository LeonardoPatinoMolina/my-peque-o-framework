import { Rule } from "../lib/leoframe.js";
import { $$, $ } from "../lib/utils.js";
import { Router } from "../pages/router.js";

export const SubNavRule = (component)=>{

  const addMoviesListener = ()=>{
    const items = component.body.querySelectorAll(".subnav_movies__list__item");
    items.forEach((item) => {
      item.addEventListener("click", () => handleClickItem({item, items, type: 'movies'}));
    });
  }
  const addShowsListener = ()=>{
    const items = component.body.querySelectorAll(".subnav_shows__list__item");
    items.forEach((item) => {
      item.addEventListener("click", () => handleClickItem({item, items, type: 'shows'}));
    });
  }
  
  const removeMoviesListener = ()=>{
    const items = component.body.querySelectorAll(".subnav_movies__list__item");
    items.forEach((item) => {
      item.removeEventListener("click", () => handleClickItem({item, items, type: 'movies'}));
    });
  }
  
  const removeShowsListener = ()=>{
    const items = component.body.querySelectorAll(".subnav_shows__list__item");
    items.forEach((item) => {
      item.removeEventListener("click", () => handleClickItem({item, items, type: 'shows'}));
    });
  }

  return new Rule({
    adders: [
      addMoviesListener, 
      addShowsListener
    ],
    removers: [
      removeMoviesListener, 
      removeShowsListener
    ]
  });
}

//utils---------------------------------------------------
function handleClickItem({item, items, type}){
  $$(".nav__list__item").forEach((it)=>{
    if(it.dataset.link === type){
      it.classList.add("selected")
    }else it.classList.remove("selected")
  })
  if (type === 'movies') {
      const itemsSubNavShows = $$(".subnav_shows__list__item");
      itemsSubNavShows.forEach(deselect);
      if (item.dataset.opction === "Popular") {
        Router.jumpToTree("popularmovies");
      } else if (item.dataset.opction === "Mejores") {
        Router.jumpToTree("ratedmovies");
      } else if (item.dataset.opction === "Próximamente") {
        Router.jumpToTree("upcomingmovies");
      }

      items.forEach(deselect);
      item.classList.add("selected");
  }
  if(type === 'shows'){
      const itemsSubNavMovies = $$(".subnav_shows__list__item");
      itemsSubNavMovies.forEach(deselect);
      if (item.dataset.opction === "Popular") {
        Router.jumpToTree("popularshows");
      } else if (item.dataset.opction === "Mejores") {
        Router.jumpToTree("ratedshows");
      } else if (item.dataset.opction === "Al aire") {
        Router.jumpToTree("onairshows");
      }

      items.forEach(deselect);
      item.classList.add("selected");
  }
}//end handle

function deselect(item) {
  item.classList.remove("selected");
}