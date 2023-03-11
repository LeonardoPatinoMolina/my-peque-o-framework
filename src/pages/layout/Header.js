import { Component, TreeLayoutComponent } from "../../lib/leoframe.js";

export const Header = new TreeLayoutComponent({
  name: 'header',
  children: [
    new Component({
      name: "header",
      path: "/src/components/layout/header/",
      rootNumber: false,
    }).build({
      parent: false,
      childBuilder: (parent) => {
        new Component({
          name: "search",
          path: "/src/components/layout/header/",
          rootNumber: 1,
        }).build({ parent });
        new Component({
          name: "nav",
          path: "/src/components/layout/header/",
          rootNumber: 2,
        }).build({ parent });
      },
    }),
  ],
});
