import { APIKEY } from "../../../privateGlobal.js";
import { MoviesProps } from "../../adapter/movies.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { TreeComponent } from "../../lib/leoframe.js";

const builder = async (component)=>{
  const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=es-ES&page=1`);
  const rjson = await response.json()
  const moviesP = rjson.results;

  for (let i = 0; i < 20; i++) {
    const comp = new CardComponent({
      props: {
        ...new MoviesProps(moviesP[i]).data, 
        filter: 'upcoming',
        type: 'movie'
      }
    })
    component.children.push(comp)
  }//end for
}

const UpComingMovies = new TreeComponent({
  name: 'upcomingmovies',
  children: [
    new CardWrapperComponent({builder}),
  ]
});

export default UpComingMovies;