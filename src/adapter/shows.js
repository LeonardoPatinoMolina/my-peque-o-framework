const imgPlaceholder = 'https://lesarcs-filmfest.com/laff/photo/1-500x500/gallery/2022_com/TALENT%20VILLAGE/Juho-Kuosmanen-Cannes-17072021-kuva-Sami-Kuokkanen-2048x1365.jpg';

export class ShowsProps{
  constructor(show){
    this.id = show.id;
    this.title = show.name;
    this.original_title = show.original_name;
    this.vote_average = show.vote_average;
    this.stars = '⭐';
    this.img = show.poster_path ? `https://image.tmdb.org/t/p/w300${show.poster_path}` : imgPlaceholder;
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