import { HeaderComponent } from "../../../components/layout/header/header.template.js";
import { NavComponent } from "../../../components/layout/header/nav.template.js";
import { SubnavComponent } from "../../../components/layout/header/subnav.template.js";
import { TreeLayoutComponent } from "../../../lib/leoframe.js";

export const Header = new TreeLayoutComponent({
  name: "header",
  children: [
    new HeaderComponent()
      .setChildren([
        new NavComponent(),
        new SubnavComponent({
          props: {
            className: "subnav_movies",
            opction1: "Popular",
            opction2: "Mejores",
            opction3: "Próximamente",
          }
        }),
          new SubnavComponent({
            props: {
              className: "subnav_shows",
              opction1: "Popular",
              opction2: "Mejores",
              opction3: "Al aire",
            }
          })
        ])
  ],
});
