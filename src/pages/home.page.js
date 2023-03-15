import { Component, TreeComponent } from "../lib/leoframe.js";

const Home = new TreeComponent({
  name: 'home',
  children: [
    new Component({
      name: 'banner',
      templatePath: 'components/banner/',
    })
  ]
});

export default Home;