import { Component } from "../../../lib/leoframe.js";
import { NavRule } from "../../../rules/nav.rule.js";


export class NavComponent extends Component{
  name = "nav";
  
  didMount = async ()=>{
    NavRule(this).add()
  }
  didUnmount = async ()=>{
    NavRule(this).remove();
  }

  template(){
    return super.template(`
    <nav class="nav">
      <ul class="nav__list">
        <li data-link="home" tabindex="-1" class="nav__list__item selected">Home</li>
        <li data-link="movies" tabindex="-1" class="nav__list__item">Peliculas</li>
        <li data-link="shows" tabindex="-1" class="nav__list__item">Series TV</li>
        <li data-link="about" tabindex="-1" class="nav__list__item">Acerca de</li>
      </ul>
    </nav>
    `);
  }
}