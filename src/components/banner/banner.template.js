import { Component } from "../../lib/leoframe.js";

export class BannerComponent extends Component{
  name = "banner";
  template = `
<div class="banner">
  <h2 class="banner__title">Luces, cámara...</h2>
  <img class="banner__img"
  src="src/assets/projector_movie.svg" alt="projector movie" draggable="false">
  <p class="banner__paragraph">
    <span>¡Bienvenido a nuestro sitio de películas!</span> Aquí, encontrarás una amplia selección de obras de todo el mundo, organizadas en categorías fáciles de navegar. Nuestro catálogo incluye una gran variedad de entregas, desde dramas y comedias hasta películas de terror y acción, para satisfacer todos los gustos.
  </p>
  <div class="root0"></div>
</div>
`;
}
