import { VolatileComponent } from "../../../lib/leoframe.js";

export class VolatileCardWrapperComponent extends VolatileComponent{
  name = 'cardwrapper_volatile';
  template = `
  <div class="cardvolatile_wrapper">
    [volatile]
  </div>
  `;
}