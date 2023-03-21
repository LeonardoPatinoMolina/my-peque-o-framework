import { BASE_URL_THUMDNAIL_300, imgPLACEHOLDER } from "../lib/globals.js";

export class MoviesProps{
  constructor(movie){
    let img
    if(movie?.poster_path){
      img = `${BASE_URL_THUMDNAIL_300}${movie.poster_path}`
    }else{
      img = imgPLACEHOLDER
    }
    this.id = movie.id
    this.title = movie.title;
    this.original_title = movie.original_title;
    this.release_date = movie.release_date;
    this.vote_average = movie.vote_average;
    this.stars = '⭐';
    this.img = img;
    
    this.data = {
      id: this.id,
      title: this.title,
      original_title: this.original_title,
      release_date: this.release_date,
      vote_average: this.vote_average,
      stars: this.stars,
      img: this.img
    }
  }
  }