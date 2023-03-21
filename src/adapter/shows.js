import { BASE_URL_THUMDNAIL_300, imgPLACEHOLDER } from "../lib/globals.js";

export class ShowsProps{
  constructor(show){
    let img
    if(show?.poster_path){
      img = `${BASE_URL_THUMDNAIL_300}${show.poster_path}`
    }else{
      img = imgPLACEHOLDER
    }
    this.id = show.id;
    this.title = show.name;
    this.original_title = show.original_name;
    this.vote_average = show.vote_average;
    this.stars = '⭐';
    this.img = img;
    
    this.data = {
      id: this.id,
      title: this.title,
      original_title: this.original_title,
      vote_average: this.vote_average,
      stars: this.stars,
      img: this.img
    }
  }
}