import { CardVolatileComponent } from "../../../components/volatile/cards/card_volatile.template.js";
import { VolatileCardProps } from "../../../adapter/volatileCard.js";
import { APIKEY } from "../../../../privateGlobal.js";
import { fetchCacheInterceptor } from "../../../lib/utils.js";

export const modalBuilder = async (component, treeProps)=>{
  // treeProps.query
  component.children = [];
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES&page=1`;
  const response = await fetchCacheInterceptor(url, {
    cacheName: 'modal_cards', 
    revalidate: 120//dos horas
  });
  const moviesP = response.results;

  for (const data of moviesP) {
    const propsData = new VolatileCardProps(data).data;
    const comp = new CardVolatileComponent({
      props: {type: 'movie', ...propsData}
    })
    if(!component.children.find(co=>propsData.title === co.props.title)){
      component.children.push(comp)
    }
  }//end for
}