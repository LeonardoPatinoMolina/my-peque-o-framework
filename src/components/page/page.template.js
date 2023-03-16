import { Component } from "../../lib/leoframe.js";

export class PageComponent extends Component {
  name = 'page';
  template = `
<section class="page">
  <div class="page__aside">
    <h2 class="page__aside__title">{title}</h2>
    <h3 class="page__aside__subtitle">{subtitle}</h3>
    <img draggable="false" class="page__aside__img" src="{img}" alt="picture">
    <div class="page__aside__info">
      <p class="page__aside__info__text">{rate}{stars}</p>
      <p class="page__aside__info__text">{genres}</p>
    </div>
  </div>
  <p class="page__info__text">{date}</p>
  <p class="page__description" >{description}</p>
  <div tabindex="-1" class="page__watch">
    <img class="page__watch__img" src="src/assets/play_btn.svg" alt="play button">
  </div>
</section>
`;

}