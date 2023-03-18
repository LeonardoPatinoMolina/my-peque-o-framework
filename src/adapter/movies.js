const imgPlaceholder = 'https://lesarcs-filmfest.com/laff/photo/1-500x500/gallery/2022_com/TALENT%20VILLAGE/Juho-Kuosmanen-Cannes-17072021-kuva-Sami-Kuokkanen-2048x1365.jpg';

export class MoviesProps{
  constructor(movie){
    this.id = movie.id
    this.title = movie.title;
    this.original_title = movie.original_title;
    this.release_date = movie.release_date;
    this.vote_average = movie.vote_average;
    this.stars = '⭐';
    this.img = movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : imgPlaceholder;
    
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