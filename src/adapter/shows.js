export class ShowsProps{
  constructor(serie){
    this.id = serie.id;
    this.title = serie.name;
    this.original_title = serie.original_name;
    this.vote_average = serie.vote_average;
    this.stars = '⭐';
    this.img = `https://image.tmdb.org/t/p/w300${serie.poster_path}`;
    this.data = {
      id: serie.id,
      title: serie.name,
      original_title: serie.original_name,
      vote_average: serie.vote_average,
      stars: '⭐',
      img: `https://image.tmdb.org/t/p/w300${serie.poster_path}`
    }
  }
  }