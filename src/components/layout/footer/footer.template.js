import { Component } from "../../../lib/leoframe.js";

export class FooterComponent extends Component{
  props = {year: 2023};
  name = "footer";
  template(){
    return super.template(`
    <footer class="footer ">
      <ul class="footer__list">
        <li class="footer__list__item">${this.props.year}</li>
        <li class="footer__list__item">LeonardoPatino99@gmail.com</li>
        <li class="footer__list__item">
          <a href="https://github.com/LeoCHAD" target="_blank">LeoChad-GitHub</a>
        </li>
      </ul>
    </footer>
    `);
  }
}