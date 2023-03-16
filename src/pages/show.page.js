import { APIKEY } from '../../privateGlobal.js';
import { ShowPropsPage } from '../adapter/showPage.js';
import { PageComponent } from '../components/page/page.template.js';
import { TreeComponent } from '../lib/leoframe.js';

const builder = async (parent, treeProps)=>{
  const response = await fetch(`https://api.themoviedb.org/3/tv/${treeProps.id}?api_key=${APIKEY}&language=es-ES`);
  const showDetail = await response.json()
  parent.props = new ShowPropsPage(showDetail).data
}

const Show = new TreeComponent({
  name: 'show',
  children: [
    new PageComponent([], builder)
  ]
});

export default Show;