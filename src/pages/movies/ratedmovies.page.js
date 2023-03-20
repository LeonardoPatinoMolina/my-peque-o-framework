import { APIKEY } from "../../../privateGlobal.js";
import { MoviesProps } from "../../adapter/movies.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { TreeComponent } from "../../lib/leoframe.js";
import { fetchCacheInterceptor } from "../../lib/utils.js";

const builder = async (component)=>{
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=es-ES&page=1`;
  const response = await fetchCacheInterceptor(url,{
    cacheName: 'cards_movies',
    revalidate: 120//dos horas
  });
  const moviesP = response.results;

  for (let i = 0; i < 20; i++) {
    const comp = new CardComponent({
      props: {
        ...new MoviesProps(moviesP[i]).data, 
        filter: 'rated',
        type: 'movie'
      }
    })
    component.children.push(comp)
  }//end for
}

const RatedMovies = new TreeComponent({
  name: 'ratedmovies',
  children: [
    new CardWrapperComponent({builder}),
  ]
});

export default RatedMovies;