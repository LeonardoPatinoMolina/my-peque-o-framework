import {Component, TreeComponent} from '../lib/leoframe.js';

const Movie = new TreeComponent({
  name: 'movie',
  children: [
    new Component({
      name: 'page',
      templatePath: 'components/page/'
    })
  ]
});

export default Movie;