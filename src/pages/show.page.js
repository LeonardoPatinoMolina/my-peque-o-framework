import { ShowPropsPage } from '../adapter/showPage.js';
import { PageComponent } from '../components/page/page.template.js';
import { getDetailUrl } from '../lib/endpoints.js';
import { TreeComponent } from '../lib/leoframe.js';
import { fetchCacheInterceptor } from '../lib/utils.js';

const builder = async (parent, treeProps)=>{
  const response = await fetchCacheInterceptor(getDetailUrl('show', treeProps.id), {
    cacheName: 'show_page',
    revalidate: 120 // 2 horas
  });
  parent.props = new ShowPropsPage(response).data
}

const Show = new TreeComponent({
  name: 'show',
  children: [
    new PageComponent({builder})
  ]
});

export default Show;