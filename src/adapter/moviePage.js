import { BASE_URL_THUMDNAIL_500, imgPLACEHOLDER, GENRES_MOVIES } from "../lib/globals.js";

export class MoviePropsPage{
  constructor(movie){
    let imgUrl
    if(movie?.backdrop_path){
      imgUrl = `${BASE_URL_THUMDNAIL_500}${movie.backdrop_path}`
    }else{
      imgUrl = imgPLACEHOLDER
    }
    this.id = movie.id;
    this.title = movie.title;
    this.date = movie.release_date;
    this.subtitle = movie.original_title;
    this.img = imgUrl;
    this.description = movie.overview;
    this.rate = movie.vote_average 
    this.stars = '⭐';
    const gen = movie.genres.map(g=> GENRES_MOVIES[g.id])
    this.genres = gen;

    this.data = {
      id: this.id,
      title: this.title,
      date: this.date,
      subtitle: this.subtitle,
      img: this.img,
      description: this.description,
      rate: this.rate,
      stars: this.stars,
      genres: this.genres,
    }
  }
}