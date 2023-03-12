import { Pagination } from "../lib/leoframe.js"; 

/**
 * La ruta para declarar pages debe asumir como raiz al diectorio pages
 */
export const Router = new Pagination({
  home: 'home',
  pages: {
    home: 'home.page.js',
    popularmovies: 'movies/popularmovies.page.js',
    ratedmovies: 'movies/ratedmovies.page.js',
    upcomingmovies: 'movies/upcomingmovies.page.js',
  }
});