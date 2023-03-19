import { CardVolatileComponent } from "../../../components/volatile/cards/card_volatile.template.js";
import { VolatileCardProps } from "../../../adapter/volatileCard.js";
import { APIKEY } from "../../../../privateGlobal.js";

export const modalBuilder = async (component, treeProps)=>{
  // treeProps.query
  component.children = [];
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES&page=1`);
  const rjson = await response.json()
  const moviesP = rjson.results;

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