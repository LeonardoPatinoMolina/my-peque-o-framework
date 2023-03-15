import { MoviesProps } from "../../adapter/movies.js";
import { Component, TreeComponent, VolatileComponent } from "../../lib/leoframe.js";
import { TOP_RATED_MOVIES } from "../../lib/movies_data.js";

const rulesScript = document.createElement('script');
rulesScript.src = 'src/pages/movies/rules/index.js';
rulesScript.type = 'module';
rulesScript.defer = true;

const RatedMovies = new TreeComponent({
  name: 'ratedmovies',
  rulesScript, 
  children: [
    new VolatileComponent({
      name: 'cardwrapper',
      templatePath: 'components/cards/',
      builder: async (component)=>{
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=32458a9d6d90a2d065e4a80677a65409&language=es-ES&page=1');
        const rjson = await response.json()
        const moviesP = rjson.results;

        for (let i = 0; i < 20; i++) {
          const comp = new Component({
            name: 'card',
            templatePath: 'components/cards/',
            rootNumber: i + 1,
            props: {
              ...new MoviesProps(moviesP[i]).data, 
              filter: 'rated',
              type: 'movie'
            }
          })
          component.children.push(comp)
        }//end for
      }
    })
  ]
});

export default RatedMovies;