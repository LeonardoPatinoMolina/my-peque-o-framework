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

  return {
    add: [
      addMoviesListener, 
      addShowsListener
    ], 
    remove: [
      removeMoviesListener, 
      removeShowsListener
    ]
  };
}

//utils---------------------------------------------------
function handleClickItem({item, items, type}){
  if (type === 'movies') {
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