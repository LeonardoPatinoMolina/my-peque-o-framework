import {GENERES} from '../lib/globals.js'

export class ShowsProps{
  constructor(serie){
    this.id = serie.id;
    this.title = serie.name;
    this.original_title = serie.original_name;
    this.overview = serie.overview;
    this.vote_average = serie.vote_average;
    this.stars = '⭐';
    this.genere = GENERES[serie.genre_ids[0]];
    this.img = `https://image.tmdb.org/t/p/w300${serie.poster_path}`;
    this.data = {
      id: serie.id,
      title: serie.name,
      original_title: serie.original_name,
      overview: serie.overview,
      vote_average: serie.vote_average,
      stars: '⭐',
      genere: GENERES[serie.genre_ids[0]],
      img: `https://image.tmdb.org/t/p/w300${serie.poster_path}`
    }
  }
  }