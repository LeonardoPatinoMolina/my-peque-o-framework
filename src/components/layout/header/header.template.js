import { VolatileComponent } from "../../../lib/leoframe.js";
import { HeaderRule } from '../../../rules/header.rule.js';

export class HeaderComponent extends VolatileComponent{
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
    <div class="header__top">
      <h2 class="header__title">${this.props.title}</h2>
      <div class="header__boton">
        <h4 class="header__boton__title">Buscar <span class="header__boton__subtitle">+ contenido</span></h4>
        <span class="header__boton__logo material-symbols-rounded">
          search
        </span>
      </div>
    </div>
      [volatile]
    </header>
    `)}
}