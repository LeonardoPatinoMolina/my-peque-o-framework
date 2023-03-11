import { Component, TreeComponent } from "../lib/leoframe.js";

export const Movies = new TreeComponent({
  name: 'movies',
  children: [
    new Component({
      name: 'section',
      path: '/src/components/section/'
    })
      .build({parent: false})
  ]
});