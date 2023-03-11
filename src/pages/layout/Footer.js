      
import { Component, TreeLayoutComponent } from "../../lib/leoframe.js";

export const Footer = new TreeLayoutComponent({
  name: 'footer',
  treeType: 'footer',
  children: [
    new Component({
      name: "footer",
      path: "/src/components/layout/footer/",
      rootNumber: false,
    }).build({ parent: false }),

  ],
});
