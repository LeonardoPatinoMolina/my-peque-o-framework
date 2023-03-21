import { ShowsProps } from "../../adapter/shows.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { URLs } from "../../lib/endpoints.js";
import { TreeComponent } from "../../lib/leoframe.js";
import { fetchCacheInterceptor } from "../../lib/utils.js";

const builder = async (component)=>{
  const response = await fetchCacheInterceptor(URLs.shows.onair,{
    cacheName: 'cards_shows',
    revalidate: 120//dos horas
  });
  const showsP = response.results;
  for (let i = 0; i < 20; i++) {
    const comp = new CardComponent({
      props: {
        ...new ShowsProps(showsP[i]).data, 
        filter: 'onair',
        type: 'show'
      }
    })
    component.children.push(comp)
  }//end for
}

const OnAirShows = new TreeComponent({
  name: 'onairshows',
  children: [
    new CardWrapperComponent({builder}),
  ]
});

export default OnAirShows;