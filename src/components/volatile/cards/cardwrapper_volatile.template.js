import { VolatileComponent } from "../../../lib/leoframe.js";

export class VolatileCardWrapperComponent extends VolatileComponent{
  name = 'cardwrapper_volatile';
  template() {
    return super.template(`
    <div data-key="${this.key}" class="cardvolatile_wrapper">
      [volatile]
    </div>
    `);
  };
}