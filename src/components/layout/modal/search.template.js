import { Component } from "../../../lib/leoframe.js";

export class SearchComponent extends Component {
  name = 'search';
  props = { logo: "close", trigger: "close", disabled: "" };
  template = `
  <div class="search">
    <input
    placeholder="search" 
    class="search__input_text"
    type="search" 
    autocomplete="off"
    {disabled}
    oninput="window.dispatchEvent(new CustomEvent('searching', { detail: this}))"
    >
    <span 
    onclick="window.dispatchEvent(new CustomEvent('modalclose', { detail: this}))"
    class="btn_modal search__logo material-symbols-rounded"
    >
    {logo}
  </span>
  </div>
  `;
}