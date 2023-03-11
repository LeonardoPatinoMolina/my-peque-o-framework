import { Component, TreeLayoutComponent } from "../../lib/leoframe.js";

export const Header = new TreeLayoutComponent({
  name: 'header',
  children: [
    new Component({
      name: "navbar",
      path: "/src/components/navbar/",
      rootNumber: false,
    }).build({
      parent: false,
      childBuilder: (parent) => {
        new Component({
          name: "input_search",
          path: "/src/components/navbar/",
          rootNumber: 1,
        }).build({ parent });
        new Component({
          name: "nav",
          path: "/src/components/navbar/",
          rootNumber: 2,
        }).build({ parent });
      },
    }),
  ],
});
