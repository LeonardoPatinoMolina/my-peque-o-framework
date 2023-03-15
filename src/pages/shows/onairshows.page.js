import { ShowsProps } from "../../adapter/shows.js";
import { Component, TreeComponent, VolatileComponent } from "../../lib/leoframe.js";

const rulesScript = document.createElement('script');
rulesScript.src = 'src/pages/shows/rules/index.js';
rulesScript.type = 'module';
rulesScript.defer = true;

const OnAirShows = new TreeComponent({
  name: 'onairshows',
  rulesScript,
  children: [
    new VolatileComponent({
      name: 'cardwrapper',
      templatePath: 'components/cards/',
      builder: async (component)=>{
        const response = await fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=32458a9d6d90a2d065e4a80677a65409&language=es-ES&page=1');
        const rjson = await response.json()
        const showsP = rjson.results;

        for (let i = 0; i < 20; i++) {
          const comp = new Component({
            name: 'card',
            templatePath: 'components/cards/',
            rootNumber: i + 1,
            props: {
              ...new ShowsProps(showsP[i]).data, 
              filter: 'onair',
              type: 'show'
            }
          })
          component.children.push(comp)
        }//end for
      }
    })
  ]
});

export default OnAirShows;