import { Component } from "../../lib/leoframe.js";

export class CardComponent extends Component {
  name = 'card';
  template = `
  <article 
    onclick="window.dispatchEvent(new CustomEvent('cardclick', { detail: this}))" 
    class="card" 
    id="{id}" 
    data-filter="{filter}" 
    data-type="{type}"
  >
    <img class="card__img" src="{img}" alt="card picture">
    <h2 class="card__title">{title}</h2>
    <h4 class="card__subtitle">{original_title}</h3>
      <ul class="card__data_list">
        <li class="card__data_list__item">{vote_average}</li>
        <li class="card__data_list__item">{stars}</li>
      </ul>
  </article>
  `;
}