import { APIKEY } from '../../privateGlobal.js';
import { MoviePropsPage } from '../adapter/moviePage.js';
import { PageComponent } from '../components/page/page.template.js';
import {TreeComponent} from '../lib/leoframe.js';

const builder = async (component, treeProps)=>{
  const response = await fetch(`https://api.themoviedb.org/3/movie/${treeProps.id}?api_key=${APIKEY}&language=es-ES`);
  const movieDetail = await response.json()
  component.props = new MoviePropsPage(movieDetail).data
}

const Movie = new TreeComponent({
  name: 'movie',
  children: [
    new PageComponent([], builder)
  ]
});

export default Movie;