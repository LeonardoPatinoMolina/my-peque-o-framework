import { BASE_URL_THUMDNAIL_500, imgPLACEHOLDER, GENRES_TV } from "../lib/globals.js";

export class ShowPropsPage{
  constructor(show){
    let imgUrl
    if(show?.backdrop_path){
      imgUrl = `${BASE_URL_THUMDNAIL_500}${show.backdrop_path}`
    }else{
      imgUrl = imgPLACEHOLDER
    }
    this.id = show.id;
    this.title = show.name;
    this.date = show.first_air_date;
    this.subtitle = show.original_name;
    this.img = imgUrl;
    this.description = show.overview;
    this.rate = show.vote_average 
    this.stars = '⭐';
    const gen = show.genres.map(g=> GENRES_TV[g.id])
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