import { Component } from "../../../lib/leoframe.js";

export class NOtDataComponent extends Component {
  name = 'notdata';

  template(){
    return super.template(`
    <div class="not_data">
      <span class="not_data__logo material-symbols-rounded">
        manage_search
      </span>
      <p class="not_data__text">No encontrado...</p>
    </div>
    `)
  }
}