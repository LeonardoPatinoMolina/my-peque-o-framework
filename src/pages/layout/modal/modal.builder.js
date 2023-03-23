import { CardVolatileComponent } from "../../../components/volatile/cards/card_volatile.template.js";
import { VolatileCardProps } from "../../../adapter/volatileCard.js";
import { fetchPersistenceInterceptor } from "../../../lib/utils.js";
import { URLs } from "../../../lib/endpoints.js";
import { NOtDataComponent } from "../../../components/volatile/cards/not_data.template.js";

export const modalBuilder = async (component, treeProps)=>{
  component.children = [];
  //el endpoint se decide en base al filtro que se encuentre
  //seleccionado en ese momento
  const url = URLs[treeProps.primary][treeProps.secondary]
  const response = await fetchPersistenceInterceptor(url, {
    storeName: 'modal_cards',
    revalidate: 120//dos horas
  });
  const { results } = response;
"".startsWith()

  let newResults;
  //realizamos la busqueda
  if(treeProps.primary === 'movies') {
    newResults= results.filter(movie=> movie.title.toLowerCase().startsWith(treeProps?.query.toLowerCase()) || movie.original_title.toLowerCase().startsWith(treeProps?.query.toLowerCase()))
  }
  else{
    newResults= results.filter(show=> show.name.toLowerCase().startsWith(treeProps?.query.toLowerCase()) || show.original_name.toLowerCase().startsWith(treeProps?.query.toLowerCase()))
  }
  //el tipo es el filtro primary en singular
  const typeN =  treeProps.primary.slice(0, treeProps.primary.length - 1);
  if(newResults.length > 0) {
    for (const data of newResults) {
      const propsData = new VolatileCardProps(data).data;
      const comp = new CardVolatileComponent({
        props: {
          type: typeN, 
          ...propsData}
      })
      if(!component.children.find(co=>propsData.title === co.props.title)){
        component.children.push(comp)
      }
    }//end for
  }else{
    component.children.push(new NOtDataComponent())
  }
}