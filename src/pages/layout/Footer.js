import { Component, TreeLayoutComponent } from "../../lib/leoframe.js";

export const Footer = new TreeLayoutComponent({
  name: 'footer',
  children: [
    new Component({
      props: {year: 2023},
      name: "footer",
      templatePath: 'components/layout/footer/',
    })
  ],
});
