import { AboutComponent } from "../components/about/about.template.js";
import { TreeComponent } from "../lib/leoframe.js";

const About = new TreeComponent({
  children: [
    new AboutComponent()
  ]
});

export default About;