import { ShowsProps } from "../../adapter/shows.js";
import { CardComponent } from "../../components/cards/card.template.js";
import { CardWrapperComponent } from "../../components/cards/cardwrapper.template.js";
import { URLs } from "../../lib/endpoints.js";
import { TreeComponent } from "../../lib/leoframe.js";
import { fetchCacheInterceptor } from "../../lib/utils.js";

const builder = async (component)=>{
  const response = await fetchCacheInterceptor(URLs.shows.popular, {
    cacheName: 'cards_shows',
    revalidate: 120//dos horas
  });
  const showsP = response.results;

  let newShows = [];
  for (let i = 0; i < 20; i++) {
    const comp =  new CardComponent({
      props: {
        ...new ShowsProps(showsP[i]).data, 
        filter: 'popular',
        type: 'show'
      }
    })
    newShows.push(comp);
  }//end for
  component.setChildren(newShows);
}

const PopularShows = new TreeComponent({
  name: 'popularshows',
  children: [
    new CardWrapperComponent({builder}),
  ]
});

export default PopularShows;