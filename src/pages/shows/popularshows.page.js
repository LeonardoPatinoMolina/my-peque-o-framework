import { APIKEY } from "../../../privateGlobal.js";
import { ShowsProps } from "../../adapter/shows.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { TreeComponent } from "../../lib/leoframe.js";
import { fetchCacheInterceptor } from "../../lib/utils.js";

const builder = async (component)=>{
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=es-ES&page=1`;
  const response = await fetchCacheInterceptor(url, {
    cacheName: 'cards_shows',
    revalidate: 120//dos horas
  });
  const showsP = response.results;

  for (let i = 0; i < 20; i++) {
    const comp =  new CardComponent({
      props: {
        ...new ShowsProps(showsP[i]).data, 
        filter: 'popular',
        type: 'show'
      }
    })
    component.children.push(comp)
  }//end for
}

const PopularShows = new TreeComponent({
  name: 'popularshows',
  children: [
    new CardWrapperComponent({builder}),
  ]
});

export default PopularShows;