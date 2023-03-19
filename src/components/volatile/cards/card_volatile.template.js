import { Component } from "../../../lib/leoframe.js";
import { Router } from "../../../pages/router.js"
import { Modal } from "../../../pages/layout/modal/Modal.js"

const handleClick = ({currentTarget})=>{
  if(currentTarget.dataset.type === 'movie'){
    Router.jumpToTree("movie", {id: currentTarget.id});
    window.scrollTo(0,0);
  }
  if(currentTarget.dataset.type === 'show'){
    Router.jumpToTree("show", {id: currentTarget.id});
    window.scrollTo(0,0);
  }
  Modal.remove();
}

export class CardVolatileComponent extends Component{
  name = 'volatilecard';

  async didMount() {
    this.body.addEventListener("click", handleClick);
  }

  async didUnmount() {
    this.body.removeEventListener("click", handleClick);
  }

  template() {
    return super.template(`
    <div 
      id="${this.props.id}" 
      class="cardvolatile"
      data-filter="popular"
      data-type="${this.props.type}"
    >
      <h3 class="cardvolatile__title">${this.props.title}</h3>
      <p class="cardvolatile__subtitle">${this.props.body}</p>
    </div>
    `)
  }
}