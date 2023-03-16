import { APIKEY } from "../../../privateGlobal.js";
import { MoviesProps } from "../../adapter/movies.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { TreeComponent } from "../../lib/leoframe.js";

const rulesScript = document.createElement('script');
rulesScript.src = 'src/pages/movies/rules/index.js';
rulesScript.type = 'module';
rulesScript.defer = true;

const builder = async (component)=>{
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES&page=1`);
  const rjson = await response.json()
  const moviesP = rjson.results;

  for (let i = 0; i < 20; i++) {
    const comp = new CardComponent()
      .setProps({
        ...new MoviesProps(moviesP[i]).data, 
        filter: 'popular',
        type: 'movie'
      })
    component.children.push(comp);
  }//end for
}


const PopularMovies = new TreeComponent({
  name: 'popularmovies',
  rulesScript,
  children: [
    new CardWrapperComponent([], builder),
  ]
});

export default PopularMovies;