import { Component } from "../../lib/leoframe.js";

export class PageComponent extends Component {
  name = 'page';
  template(){
    return super.template(`
    <section class="page">
      <div class="page__aside">
        <h2 class="page__aside__title">${this.props.title}</h2>
        <h3 class="page__aside__subtitle">${this.props.subtitle}</h3>
        <img draggable="false" class="page__aside__img" src="${this.props.img}" alt="picture">
        <div class="page__aside__info">
          <p class="page__aside__info__text">${this.props.rate}${this.props.stars}</p>
          <p class="page__aside__info__text">${this.props.genres}</p>
        </div>
      </div>
      <p class="page__info__text">${this.props.date}</p>
      <p class="page__description" >${this.props.description}</p>
      <div tabindex="-1" class="page__watch">
        <img 
          class="page__watch__img" 
          src="src/assets/play_btn.svg" 
          alt="play button"
        >
      </div>
    </section>
    `)
  }
}