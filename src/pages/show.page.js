import {Component, TreeComponent} from '../lib/leoframe.js';

const Show = new TreeComponent({
  name: 'show',
  children: [
    new Component({
      name: 'page',
      templatePath: 'components/page/',
    })
  ]
});

export default Show;