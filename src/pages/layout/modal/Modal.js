import { TreeLayoutComponent } from "../../../lib/leoframe.js";
import { ModalSearchComponent } from "../../../components/layout/modal/modalsearch.template.js";
import { SearchComponent } from "../../../components/layout/modal/search.template.js";
import { VolatileCardWrapperComponent } from "../../../components/volatile/cards/cardwrapper_volatile.template.js";
import { CardVolatileComponent } from "../../../components/volatile/cards/card_volatile.template.js";
import { VolatileCardProps } from "../../../adapter/volatileCard.js";
import { APIKEY } from "../../../../privateGlobal.js";

const builder = async (component, treeProps)=>{
  component.children = [];
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES&page=1`);
  const rjson = await response.json()
  const moviesP = rjson.results;

  for (const data of moviesP) {
    const propsData = new VolatileCardProps(data).data;
    const comp = new CardVolatileComponent().setProps({type: 'movie', ...propsData})
    if(!component.children.find(co=>propsData.title === co.props.title)){
      component.children.push(comp)
    }
  }//end for
}
export const ResultsCards = new VolatileCardWrapperComponent([], builder);

export const Modal = new TreeLayoutComponent({
  name: "modal",
  globalProps: {query: 'a'},
  children: [
    new ModalSearchComponent()
      .setChildren([
        new SearchComponent(),
        ResultsCards
      ])
  ],
});

