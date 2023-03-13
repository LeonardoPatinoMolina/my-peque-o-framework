export class MoviesProps{
  constructor(movie){
    this.id = movie.id
    this.title = movie.title;
    this.original_title = movie.original_title;
    this.release_date = movie.release_date;
    this.vote_average = movie.vote_average;
    this.stars = '⭐';
    this.img = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    this.data = {
      id: movie.id,
      title: movie.title,
      original_title: movie.original_title,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      stars: '⭐',
      img: `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    }
  }
  }