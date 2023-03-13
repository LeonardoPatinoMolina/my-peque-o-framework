import {GENERES} from '../lib/globals.js'

export class MoviesProps{
  constructor(movie){
    this.id = movie.id
    this.title = movie.title;
    this.original_title = movie.original_title;
    this.overview = movie.overview;
    this.release_date = movie.release_date;
    this.vote_average = movie.vote_average;
    this.stars = '⭐';
    this.genere = GENERES[movie.genre_ids[0]];
    this.img = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    this.data = {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      stars: '⭐',
      genere: GENERES[movie.genre_ids[0]],
      img: `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    }
  }
  }