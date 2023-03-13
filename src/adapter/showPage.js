import { GENERES, BASE_URL_THUMDNAIL } from "../lib/globals.js"

export class ShowPropsPage{
  constructor(show){
    this.id = show.id;
    this.title = show.name;
    this.subtitle = show.original_name;
    this.img = `${BASE_URL_THUMDNAIL}${show.backdrop_path}`; 
    this.description = show.overview;
    this.rate = show.vote_average 
    this.stars = '⭐';
    this.data = {
      id: show.id,
      title: show.name,
      subtitle: show.original_name,
      img: `${BASE_URL_THUMDNAIL}${show.backdrop_path}`,
      description: show.overview,
      rate: show.vote_average,
      stars: '⭐',
    }
  }
}