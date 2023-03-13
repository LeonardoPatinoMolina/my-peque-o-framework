import { BASE_URL_THUMDNAIL } from "../lib/globals.js";
import { GENRES_TV } from "../lib/tv_data.js";

export class ShowPropsPage{
  constructor(show){
    this.id = show.id;
    this.title = show.name;
    this.date = show.first_air_date;
    this.subtitle = show.original_name;
    this.img = `${BASE_URL_THUMDNAIL}${show.poster_path}`; 
    this.description = show.overview;
    this.rate = show.vote_average 
    this.stars = '⭐';
    let gen = '';
    show.genre_ids.forEach(g=> {
      gen += ` ${GENRES_TV[g]}`
    })
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