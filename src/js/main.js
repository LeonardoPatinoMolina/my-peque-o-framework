import {ComponentsMaker} from './contructorComponent.js'

const compMaker = new ComponentsMaker();

//layout principal
compMaker.create('navbar.html');
compMaker.create('filter.html');
compMaker.create('banner.html');
compMaker.create('main_section.html');
compMaker.create('footer.html');

compMaker.build()
  .then(()=>console.log('cor'))
  .catch(()=>console.log('mal'));

