import { Component } from "../../lib/leoframe.js";
{/* <img class="banner__img"
src="src/assets/projector_movie.svg" alt="projector movie" draggable="false"> 
      <h2 class="banner__subtitle">Luces, cámara...</h2>
      <div class="banner__img_wrapper">
        <img class="banner__img"
        src="https://gifimage.net/wp-content/uploads/2017/10/cuenta-regresiva-gif-13.gif" alt="cuenta regresiva de cine antiguo" draggable="false">
        <h1 class="banner__title">lorem?</h1>
      </div>

*/}

export class BannerComponent extends Component{
  name = "banner";
  template(){
    return super.template(`
    <div class="banner">
      <div class="banner__img_wrapper">
        <img class="banner__img"
          src="https://gifimage.net/wp-content/uploads/2017/10/cuenta-regresiva-gif-13.gif" alt="cuenta regresiva de cine antiguo" draggable="false">
      </div>
      <p class="banner__paragraph">
        <span>¡Bienvenido a nuestro sitio de películas!</span> Aquí, encontrarás una amplia selección de obras de todo el mundo, organizadas en categorías fáciles de navegar. Nuestro catálogo incluye una gran variedad de entregas, desde dramas y comedias hasta películas de terror y acción, para satisfacer todos los gustos.
      </p>
    </div>
    `)
  };
}
