import { BannerComponent } from "../components/banner/banner.template.js";
import { TreeComponent } from "../lib/leoframe.js";

const Home = new TreeComponent({
  name: 'home',
  children: [
    new BannerComponent()
  ]
});

export default Home;