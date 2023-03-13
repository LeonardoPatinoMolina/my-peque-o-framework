import { BASE_URL_THUMDNAIL } from "../lib/globals.js";
import { GENRES_MOVIES } from "../lib/movies_data.js";

export class MoviePropsPage{
  constructor(movie){
    this.id = movie.id;
    this.title = movie.title;
    this.date = movie.release_date;
    this.subtitle = movie.original_title;
    this.img = `${BASE_URL_THUMDNAIL}${movie.poster_path}`; 
    this.description = movie.overview;
    this.rate = movie.vote_average 
    this.stars = '⭐';
    let gen = '';
    movie.genre_ids.forEach(g=> {
      gen += ` ${GENRES_MOVIES[g]}`
    })
    this.genres = gen;

    this.data = {
      id: this.id,
      title: this.title,
      date: this.
      date,
      subtitle: this.subtitle,
      img: this.img,
      description: this.description,
      rate: this.rate,
      stars: this.stars,
      genres: this.genres,
    }
  }
}