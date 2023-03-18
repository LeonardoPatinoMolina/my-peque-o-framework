import { APIKEY } from "../../../privateGlobal.js";
import { ShowsProps } from "../../adapter/shows.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { TreeComponent } from "../../lib/leoframe.js";

const builder = async (component)=>{
  const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=es-ES&page=1`);
  const rjson = await response.json()
  const showsP = rjson.results;

  for (let i = 0; i < 20; i++) {
    const comp = new CardComponent({
      props: {
        ...new ShowsProps(showsP[i]).data, 
        filter: 'rated',
        type: 'show'
      }
    })
    component.children.push(comp)
  }//end for
}

const RatedShows = new TreeComponent({
  name: 'ratedshows',
  children: [
    new CardWrapperComponent({builder})
  ]
});

export default RatedShows;