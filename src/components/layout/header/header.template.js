import { VolatileComponent } from "../../../lib/leoframe.js";

export class HeaderComponent extends VolatileComponent{
  props = { title: "Movies" };
  name = "header";
  template = `
  <header class="header">
    <h1 class="header__title">{title}</h1>
    <div class="header__boton">
      <h4 class="header__boton__title">Buscar</h4>
      <span class="header__boton__logo material-symbols-rounded">
        search
      </span>
    </div>
    [volatile]
  </header>
  `;
  
}