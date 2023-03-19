import { Component } from "../../lib/leoframe.js";
{/* <img class="banner__img"
src="src/assets/projector_movie.svg" alt="projector movie" draggable="false"> 
      <h2 class="banner__subtitle">Luces, cámara...</h2>
      <div class="banner__img_wrapper">
        <img class="banner__img"
        src="src/assets/popcorn.svg" alt="popcorn" draggable="false">
        <h1 class="banner__title">Popcorn?</h1>
      </div>

*/}

export class BannerComponent extends Component{
  name = "banner";
  template(){
    return super.template(`
    <div class="banner">
      <p class="banner__paragraph">
        <span>¡Bienvenido a nuestro sitio de películas!</span> Aquí, encontrarás una amplia selección de obras de todo el mundo, organizadas en categorías fáciles de navegar. Nuestro catálogo incluye una gran variedad de entregas, desde dramas y comedias hasta películas de terror y acción, para satisfacer todos los gustos.
      </p>
    </div>
    `)
  };
}
