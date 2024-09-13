import { Component } from "../../../lib/leoframe.js";

export class ModalSearchComponent extends Component{
  name = "modalsearch";
  template() {
    return super.template(`
    <section class="modal_wrapper">
      <div class="modal">
        <div class="modal__header">
          [child0]
        </div>
        [child1]
        <div class="modal_body">
          [child2]
        </div>
      </div>
    </section>
    `);
  } 
}