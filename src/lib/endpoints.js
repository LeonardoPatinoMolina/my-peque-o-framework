import { APIKEY } from "../../privateGlobal.js";
const SHOWS_ON_THE_AIR = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}&language=es-ES&page=1`;
const SHOWS_POPULAR = `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=es-ES&page=1`;
const SHOWS_TOP_RATED = `https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=es-ES&page=1`;

const MOVIES_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES&page=1`;
const MOVIES_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=es-ES&page=1`;
const MOVIES_UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=es-ES&page=1`;

export const URLs = {
  shows: {
    popular: SHOWS_POPULAR,
    rated: SHOWS_TOP_RATED,
    onair: SHOWS_ON_THE_AIR,
  },
  movies: {
    popular: MOVIES_POPULAR,
    rated: MOVIES_TOP_RATED,
    upcoming: MOVIES_UPCOMING
  }
}

/**
 * Función encargada de proveer la ruta de consulta
 * para los detalles de un show o movie
 * @param {"show" | "movie"} type 
 * @param {number | string} id 
 * @returns 
 */
export const getDetailUrl = (type, id) => {
  if(type === 'show'){
    return `https://api.themoviedb.org/3/tv/${id}?api_key=${APIKEY}&language=es-ES`
  }
  if(type === 'movie'){
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=es-ES`
  }
}