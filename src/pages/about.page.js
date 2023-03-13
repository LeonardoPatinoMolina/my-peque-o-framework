import { Component, TreeComponent } from "../lib/leoframe.js";

const About = new TreeComponent({
  name: 'about',
  children: [
    new Component({
      name: 'about',
      templatePath: 'components/about/'
    })
      .build({parent: false}),
  ]
});

export default About;