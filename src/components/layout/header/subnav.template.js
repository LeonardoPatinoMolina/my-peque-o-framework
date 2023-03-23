import { Component } from "../../../lib/leoframe.js";
import { SubNavRule } from "../../../rules/subnav.rule.js";

export class SubnavComponent extends Component{
  name = "subnav";

  didMount = async ()=> {
    SubNavRule(this).add();
  }
  
  didUnmount = async ()=> {
    SubNavRule(this).remove();
  }

  template() {
    return super.template(`
    <nav class="${this.props.className}">
      <ul class="${this.props.className}__list">
        <li data-opction="${this.props.opction1}" class="${this.props.className}__list__item">
          ${this.props.opction1}
        </li>
        <li data-opction="${this.props.opction2}" class="${this.props.className}__list__item">
          ${this.props.opction2}
        </li>
        <li data-opction="${this.props.opction3}" class="${this.props.className}__list__item">
          ${this.props.opction3}
        </li>
      </ul>
    </nav>
    `);
  }
}