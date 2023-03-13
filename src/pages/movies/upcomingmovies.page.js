import { MoviesProps } from "../../adapter/movies.js";
import { Component, TreeComponent } from "../../lib/leoframe.js";
import { UPCOMING_MOVIES } from "../../lib/movies_data.js";

const rulesScript = document.createElement('script');
rulesScript.src = 'src/pages/movies/rules/index.js';
rulesScript.type = 'module';
rulesScript.defer = true;

const UpComingMovies = new TreeComponent({
  name: 'upcomingmovies',
  rulesScript,
  children: [
    new Component({
      name: 'cardwrapper',
      templatePath: 'components/cards/'
    })
      .build({
        parent: false,
        childBuilder: (parent)=>{
          for (let i = 0; i < 20; i++) {
            new Component({
              name: 'card',
              templatePath: 'components/cards/',
              rootNumber: i + 1,
              props: {
                ...new MoviesProps(UPCOMING_MOVIES[i]).data, 
                filter: 'upcoming',
                type: 'movie'
              }
            })
              .build({parent});
          }//end for
        }
      })
  ]
});

export default UpComingMovies;