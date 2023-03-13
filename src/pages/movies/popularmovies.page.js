import { MoviesProps } from "../../adapter/movies.js";
import { Component, TreeComponent } from "../../lib/leoframe.js";
import { POPULAR_MOVIES } from "../../lib/movies_data.js";

const rulesScript = document.createElement('script');
rulesScript.src = 'src/pages/movies/rules/index.js';
rulesScript.type = 'module';
rulesScript.defer = true;

const PopularMovies = new TreeComponent({
  name: 'popularmovies',
  rulesScript,
  children: [
    new Component({
      name: 'cardwrapper',
      templatePath: 'components/cards/'
    })
      .kinship({
        childBuilder: (parent)=>{
          for (let i = 0; i < 20; i++) {
            new Component({
              name: 'card',
              templatePath: 'components/cards/',
              rootNumber: i + 1,
              props: {
                ...new MoviesProps(POPULAR_MOVIES[i]).data, 
                filter: 'popular',
                type: 'movie'
              }
            })
              .kinship({parent});
          }//end for
        }
      })
  ]
});

export default PopularMovies;