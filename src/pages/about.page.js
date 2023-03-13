import { Component, TreeComponent } from "../lib/leoframe.js";

const About = new TreeComponent({
  name: 'about',
  children: [
    new Component({
      name: 'about',
      templatePath: 'components/about/'
    })
  ]
});

export default About;