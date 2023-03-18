import { Component } from "../../../lib/leoframe.js";
import { SearchRule } from "../../../rules/search.rule.js";

export class SearchComponent extends Component {
  name = 'search';
  props = { logo: "close", value: '' };
  
  didMount = async ()=> {
    const { add } = SearchRule(this);
    add.forEach(a=>{ a() });
  }
  didUnmount = async ()=> {
    const { remove } = SearchRule(this);
    remove.forEach(r=>{ r() });
  }
  
  template() {
  return super.template(`
  <div data-key="${this.key}" class="search">
    <input
      placeholder="buscar..." 
      type="search"
      class="search__input_text"
      autocomplete="off"
      autofocus
      value="{value}"
    >
    <span 
      id="btn_close_modal"
      class="btn_modal search__logo material-symbols-rounded"
    >
    {logo}
  </span>
  </div>
  `) 
  }
}