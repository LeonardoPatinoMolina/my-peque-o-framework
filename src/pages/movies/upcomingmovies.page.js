import { Component, TreeComponent } from "../../lib/leoframe.js";
import { UPCOMING_MOVIES } from "../../lib/movies_data.js";
import {GENERES, BASE_URL_THUMDNAIL} from '../../lib/globals.js';

const average2stars = (average)=>{
  const n = parseInt(average) / 2;
  let stars = '⭐';
  for (let i = 0; i < n; i++) {
    stars += '⭐'
  }
  return stars;
}

const getPropsMovies = (movie)=>{
  return {
    title: movie.title,
    original_title: movie.original_title,
    overview: movie.overview,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    stars: average2stars(movie.vote_average),
    genere: GENERES[movie.genre_ids[0]],
    img: `${BASE_URL_THUMDNAIL}${movie.backdrop_path}`
  }
}

const UpComingMovies = new TreeComponent({
  name: 'upcomingmovies',
  children: [
    new Component({
      name: 'movies',
      templatePath: 'components/movies/'
    })
      .build({
        parent: false,
        childBuilder: (parent)=>{
          for (let i = 0; i < 20; i++) {
            new Component({
              name: 'movie',
              templatePath: 'components/movies/',
              rootNumber: i + 1,
              props: getPropsMovies(UPCOMING_MOVIES[i])
            })
              .build({parent});
          }//end for
        }
      })
  ]
});

export default UpComingMovies;