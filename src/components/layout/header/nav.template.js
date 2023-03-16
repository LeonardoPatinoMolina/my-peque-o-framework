import { Component } from "../../../lib/leoframe.js";

export class NavComponent extends Component{
  name = "nav";
  template = `
  <nav class="nav">
    <ul class="nav__list">
      <li data-link="home" tabindex="-1" class="underline-an nav__list__item">Home</li>
      <li data-link="movies" tabindex="-1" class="underline-an nav__list__item">Peliculas</li>
      <li data-link="series" tabindex="-1" class="underline-an nav__list__item">Series TV</li>
      <li data-link="about" tabindex="-1" class="underline-an nav__list__item">Acerca de</li>
    </ul>
  </nav>
  `;
}