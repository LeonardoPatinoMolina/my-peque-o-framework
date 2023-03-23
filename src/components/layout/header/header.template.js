import { Component } from "../../../lib/leoframe.js";
import { HeaderRule } from '../../../rules/header.rule.js';

export class HeaderComponent extends Component{
  props = { title: "Movies" };
  name = "header";

  didMount = async ()=>{
    HeaderRule(this).add();
  }
  
  didUnmount = async ()=>{
    HeaderRule(this).remove()
  }

    template(){
    return super.template(`
    <header class="header">
      <h2 class="header__title">${this.props.title}</h2>
      [child0]
      <div class="header__boton">
        <h4 class="header__boton__title">Buscar</h4>
        <span class="header__boton__logo material-symbols-rounded">
          search
        </span>
      </div>
      [child1]
      [child2]
    </header>
    `)}
}