import { $, $$ } from "../../../../lib/utils.js";
import { Router } from "../../../router.js";

const itemsSubNavMovies = $$(".subnav_movies__list__item");
const itemsSubNavSeries = $$(".subnav_series__list__item");
const itemsNav = $$(".nav__list__item");

/**
 * Listeners de la barra de navegación pricipal,
 * su porpósito es dar rinteractibilidad a la barra,
 * entre algunas de susu funciones, desplegar una barra secundaria
 * y gestionar sus opciones
 */
  itemsNav.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.dataset.link === "home") Router.comeHome();
      if (item.dataset.link !== "movies") {
        itemsSubNavMovies.forEach(deselect);
        if ($(".subnav_movies").classList.contains("open_an")) {
          $(".subnav_movies").classList.remove("open_an");
          $(".subnav_movies").classList.add("close_an");
        }
      }
      if (item.dataset.link !== "series") {
        itemsSubNavMovies.forEach(deselect);
        if ($(".subnav_series").classList.contains("open_an")) {
          $(".subnav_series").classList.remove("open_an");
          $(".subnav_series").classList.add("close_an");
        }
      }
      //items principales
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
  itemsNav.forEach((item) => {
    item.addEventListener("click", () => {
      itemsNav.forEach(deselect);
      item.classList.add("selected");
    });
  });

  function deselect(item) {
    item.classList.remove("selected");
  }

