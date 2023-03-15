import { ShowPropsPage } from '../adapter/showPage.js';
import {Component, TreeComponent} from '../lib/leoframe.js';

const builder = async (parent, treeProps)=>{
  const response = await fetch(`https://api.themoviedb.org/3/tv/${treeProps.id}?api_key=32458a9d6d90a2d065e4a80677a65409&language=es-ES`);
  const showDetail = await response.json()
  parent.props = new ShowPropsPage(showDetail).data
}

const Show = new TreeComponent({
  name: 'show',
  children: [
    new Component({
      name: 'page',
      templatePath: 'components/page/',
      builder
    })
  ]
});

export default Show;