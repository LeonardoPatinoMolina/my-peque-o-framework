import { MoviePropsPage } from '../adapter/moviePage.js';
import {Component, TreeComponent} from '../lib/leoframe.js';

const builder = async (component, treeProps)=>{
  const response = await fetch(`https://api.themoviedb.org/3/movie/${treeProps.id}?api_key=32458a9d6d90a2d065e4a80677a65409&language=es-ES`);
  const movieDetail = await response.json()
  component.props = new MoviePropsPage(movieDetail).data
}

const Movie = new TreeComponent({
  name: 'movie',
  children: [
    new Component({
      name: 'page',
      templatePath: 'components/page/',
      builder
    })
  ]
});

export default Movie;