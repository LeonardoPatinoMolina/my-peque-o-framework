import { Component, TreeLayoutComponent, VolatileComponent } from "../../../lib/leoframe.js";

const rulesScript = document.createElement("script");
rulesScript.src = "src/pages/layout/header/rules/index.js";
rulesScript.type = "module";
rulesScript.defer = true;

export const Header = new TreeLayoutComponent({
  name: "header",
  rulesScript,
  children: [
    new VolatileComponent({
      props: { title: "Movies" },
      name: "header",
      templatePath: "components/layout/header/",
      children: [
        new Component({
          name: "nav",
          templatePath: "components/layout/header/",
        }),
        new Component({
          name: "subnav",
          templatePath: "components/layout/header/",
          props: {
            className: "subnav_movies",
            opction1: "Popular",
            opction2: "Mejores",
            opction3: "Próximamente",
          },
        }),
        new Component({
          name: "subnav",
          templatePath: "components/layout/header/",
          props: {
            className: "subnav_series",
            opction1: "Popular",
            opction2: "Mejores",
            opction3: "Al aire",
          },
        }),
      ],
    }),
  ],
});
