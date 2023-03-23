import { Component } from "../../lib/leoframe.js";

export class PageComponent extends Component {
  name = 'page';
  template(){
    let Allgenres = '';
    this.props.genres.forEach(gen=>{
      Allgenres += `<p class="page__aside__info__genres__genre">${gen}</p>`;
    });
    return super.template(`
    <section class="page">
      <div class="page__aside">
        <div class="page__aside__titles">
          <h2 class="page__aside__titles__title">${this.props.title}</h2>
          <h3 class="page__aside__titles__subtitle">${this.props.subtitle}</h3>
        </div>
        <div class="page__aside__img_wrapper">
          <img 
            draggable="false" 
            class="page__aside__img_wrapper__img loading_img-an" src="${this.props.img}" alt="imagen de página"
          >
          <p class="page__aside__img_wrapper__text">${this.props.date.slice(0,4)}</p>
        </div>
        <div class="page__aside__info">
          <p class="page__aside__info__rate">${this.props.rate}${this.props.stars}</p>
          <div class="page__aside__info__genres">
            ${Allgenres}
          </div>
        </div>
        <p class="page__aside__description" >${this.props.description}</p>
      </div>
      <div tabindex="-1" class="page__watch">
        <img 
          class="page__watch__img" 
          src="src/assets/play_btn.svg" 
          alt="play button"
          draggable="false"
          referrerPolicy="no-referrer"
        >
      </div>
    </section>
    `)
  }
}