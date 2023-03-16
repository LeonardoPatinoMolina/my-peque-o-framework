import { $, $$ } from "../../../../lib/utils.js";
import { Router } from "../../../router.js";
import { Modal } from "../../modal/Modal.js";

//titulo principal de encabezado
const title = $(".header__title");
//items de barra de navegación principal
const principlaItemNav = $$(".nav__list__item");
//items de barra de navegación oara peliculas
const itemsSubNavMovies = $$(".subnav_movies__list__item");
//items de barra de navegación oara series
const itemsSubNavSeries = $$(".subnav_series__list__item");
//trigger de respliegue de modal en header
const headerModalTriggers = $('.header__boton');


title.addEventListener('click',()=>Router.comeHome());
/**
 * Listeners de la barra de navegación pricipal,
 * su porpósito es dar interactibilidad a la barra,
 * entre algunas de sus funciones especificas: desplegar 
 * la barra secundaria para peliculas y series
 * y gestionar sus opciones
 */
  principlaItemNav.forEach((item) => {
    item.addEventListener("click", () => {
      
      if (item.dataset.link === "home") Router.comeHome();

      //desplegamos la barra secundaria de peliculas si
      if (item.dataset.link !== "movies") {
        itemsSubNavMovies.forEach(deselect);
        if ($(".subnav_movies").classList.contains("open_an")) {
          $(".subnav_movies").classList.remove("open_an");
          $(".subnav_movies").classList.add("close_an");
        }
      
      
      }
      //desplegamos la barra secundaria de series si
      if (item.dataset.link !== "series") {
        itemsSubNavMovies.forEach(deselect);
        if ($(".subnav_series").classList.contains("open_an")) {
          $(".subnav_series").classList.remove("open_an");
          $(".subnav_series").classList.add("close_an");
        }
      }

      //senencias de control de barras secundarias
      //movies
      if (item.dataset.link === "movies") {
        $(".subnav_movies").classList.toggle("open_an");
        $(".subnav_movies").classList.toggle("close_an");
      }
      //series tv
      if (item.dataset.link === "series") {
        $(".subnav_series").classList.toggle("open_an");
        $(".subnav_series").classList.toggle("close_an");
      }
      //about
      if (item.dataset.link === "about") {
        Router.jumpToTree("about");
      }
    });
  });

  //reglas para sub barra de navegación movies
  itemsSubNavMovies.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.dataset.opction === "Popular") {
        Router.jumpToTree("popularmovies");
      } else if (item.dataset.opction === "Mejores") {
        Router.jumpToTree("ratedmovies");
      } else if (item.dataset.opction === "Próximamente") {
        Router.jumpToTree("upcomingmovies");
      }

      itemsSubNavMovies.forEach(deselect);
      item.classList.add("selected");
    });
  });

  //reglas para sub barra de navegación series
  itemsSubNavSeries.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.dataset.opction === "Popular") {
        Router.jumpToTree("popularshows");
      } else if (item.dataset.opction === "Mejores") {
        Router.jumpToTree("ratedshows");
      } else if (item.dataset.opction === "Al aire") {
        Router.jumpToTree("onairshows");
      }

      itemsSubNavSeries.forEach(deselect);
      item.classList.add("selected");
    });
  });

  //regla compartida
  principlaItemNav.forEach((item) => {
    item.addEventListener("click", () => {
      principlaItemNav.forEach(deselect);
      item.classList.add("selected");
    });
  });

  function deselect(item) {
    item.classList.remove("selected");
  }

  //regla para despliegue de modal
  headerModalTriggers.addEventListener('click',()=>{
    Modal.render().then(()=>{
      $('.modal').classList.add('coldDown_an');
      $('.modal_wrapper').style.display = 'flex';
    })
  })
