import { MoviePropsPage } from '../adapter/moviePage.js';
import { PageComponent } from '../components/page/page.template.js';
import { getDetailUrl } from '../lib/endpoints.js';
import {TreeComponent} from '../lib/leoframe.js';
import { fetchCacheInterceptor } from '../lib/utils.js';

const builder = async (component, treeProps)=>{
  const response = await fetchCacheInterceptor(getDetailUrl('movie', treeProps.id),{
    cacheName: 'movie_page',
    revalidate: 120//2 horas
  });
  component.setProps(new MoviePropsPage(response).data);
}

const Movie = new TreeComponent({
  name: 'movie',
  children: [
    new PageComponent({builder})
  ]
});

export default Movie;