import { Component, TreeComponent } from "../lib/leoframe.js";

export const Home = new TreeComponent({
  name: 'home',
  treeType: 'home',
  children: [
    new Component({
      name: 'banner',
      path: '/src/components/banner/'
    })
      .build({parent: false}),
  ]
});