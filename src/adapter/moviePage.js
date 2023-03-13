import { GENERES, BASE_URL_THUMDNAIL } from "../lib/globals.js"

export class MoviePropsPage{
  constructor(movie){
    this.id = movie.id;
    this.title = movie.title;
    this.subtitle = movie.original_title;
    this.img = `${BASE_URL_THUMDNAIL}${movie.backdrop_path}`; 
    this.description = movie.overview;
    this.rate = movie.vote_average 
    this.stars = '⭐';
    this.data = {
      id: movie.id,
      title: movie.title,
      subtitle: movie.original_title,
      img: `${BASE_URL_THUMDNAIL}${movie.backdrop_path}`,
      description: movie.overview,
      rate: movie.vote_average,
      stars: '⭐',
    }
  }
}