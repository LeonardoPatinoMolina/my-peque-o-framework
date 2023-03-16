import { Component } from "../../../lib/leoframe.js";

export class SubnavComponent extends Component{
  name = "subnav";
  template = `
<nav class="{className} close_an">
  <ul class="{className}__list">
    <li data-opction="{opction1}" class="{className}__list__item">
      {opction1}
    </li>
    <li data-opction="{opction2}" class="{className}__list__item">
      {opction2}
    </li>
    <li data-opction="{opction3}" class="{className}__list__item">
      {opction3}
    </li>
  </ul>
</nav>
`;
}