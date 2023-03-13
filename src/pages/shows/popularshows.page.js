import { ShowsProps } from "../../adapter/shows.js";
import { Component, TreeComponent } from "../../lib/leoframe.js";
import { POPULAR_TV } from "../../lib/tv_data.js";

const rulesScript = document.createElement('script');
rulesScript.src = 'src/pages/shows/rules/index.js';
rulesScript.type = 'module';
rulesScript.defer = true;

const PopularShows = new TreeComponent({
  name: 'popularshows',
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
                ...new ShowsProps(POPULAR_TV[i]).data,
                 filter: 'popular',
                 type: 'show'
                }
            })
              .build({parent});
          }//end for
        }
      })
  ]
});

export default PopularShows;