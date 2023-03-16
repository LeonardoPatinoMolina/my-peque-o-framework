import { FooterComponent } from "../../components/layout/footer/footer.template.js";
import { TreeLayoutComponent } from "../../lib/leoframe.js";

export const Footer = new TreeLayoutComponent({
  name: 'footer',
  children: [
    new FooterComponent()
  ],
});
