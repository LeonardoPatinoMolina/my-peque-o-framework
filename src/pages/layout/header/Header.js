import { HeaderComponent } from "../../../components/layout/header/header.template.js";
import { NavComponent } from "../../../components/layout/header/nav.template.js";
import { SubnavComponent } from "../../../components/layout/header/subnav.template.js";
import { TreeLayoutComponent } from "../../../lib/leoframe.js";

const rulesScript = document.createElement("script");
rulesScript.src = "src/pages/layout/header/rules/index.js";
rulesScript.type = "module";
rulesScript.defer = true;

export const Header = new TreeLayoutComponent({
  name: "header",
  rulesScript,
  children: [
    new HeaderComponent()
      .setChildren([
        new NavComponent(),
        new SubnavComponent()
          .setProps({
            className: "subnav_movies",
            opction1: "Popular",
            opction2: "Mejores",
            opction3: "Próximamente",
          }),
        new SubnavComponent()
          .setProps({
            className: "subnav_series",
            opction1: "Popular",
            opction2: "Mejores",
            opction3: "Al aire",
          }),
        ])
  ],
});
