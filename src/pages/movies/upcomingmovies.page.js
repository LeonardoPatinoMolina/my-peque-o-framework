import { MoviesProps } from "../../adapter/movies.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { URLs } from "../../lib/endpoints.js";
import { TreeComponent } from "../../lib/leoframe.js";
import { fetchCacheInterceptor } from "../../lib/utils.js";

const builder = async (component)=>{
  const response = await fetchCacheInterceptor(URLs.movies.upcoming, {
    cacheName: 'cards_movies',
    revalidate: 120//dos horas
  });
  const moviesP = response.results;

  let newMovies = [];
  for (let i = 0; i < 20; i++) {
    const comp = new CardComponent({
      props: {
        ...new MoviesProps(moviesP[i]).data, 
        filter: 'upcoming',
        type: 'movie'
      }
    })
    newMovies.push(comp)
  }//end for
  component.setChildren(newMovies);
}

const UpComingMovies = new TreeComponent({
  name: 'upcomingmovies',
  children: [
    new CardWrapperComponent({builder}),
  ]
});

export default UpComingMovies;