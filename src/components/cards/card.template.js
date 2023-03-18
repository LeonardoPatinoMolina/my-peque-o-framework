import { Component } from "../../lib/leoframe.js";
import { Router } from "../../pages/router.js"

const handleClick = ({currentTarget}) =>{
  if(currentTarget.dataset.type === 'movie'){
    Router.jumpToTree("movie", {id: currentTarget.id});
    window.scrollTo(0,0);
  }
  if(currentTarget.dataset.type === 'show'){
    Router.jumpToTree("show", {id: currentTarget.id});
    window.scrollTo(0,0);
  }
}

export class CardComponent extends Component {
  name = 'card';

  async didMount() {
    this.body.addEventListener("click", handleClick);
  }
  async didUnmount() {
    this.body.removeEventListener("click", handleClick);
  }

  template(){
    return super.template(`
    <article 
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
    `)
  }
}