import { MoviesProps } from "../../adapter/movies.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { URLs } from "../../lib/endpoints.js";
import { TreeComponent } from "../../lib/leoframe.js";
import { fetchCacheInterceptor } from "../../lib/utils.js";

const builder = async (component)=>{
  const response = await fetchCacheInterceptor( URLs.movies.popular,{
    cacheName: 'cards_movies', 
    revalidate: 120//dos horas
  });
  const moviesP = response.results;

  for (let i = 0; i < 20; i++) {
    const comp = new CardComponent({
      props: {
        ...new MoviesProps(moviesP[i]).data, 
        filter: 'popular',
        type: 'movie'
      }
    })
    component.children.push(comp);
  }//end for
}


const PopularMovies = new TreeComponent({
  name: 'popularmovies',
  children: [
    new CardWrapperComponent({builder}),
  ]
});

export default PopularMovies;