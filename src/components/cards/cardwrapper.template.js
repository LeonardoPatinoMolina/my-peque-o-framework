import { VolatileComponent } from "../../lib/leoframe.js";

export class CardWrapperComponent extends VolatileComponent{
  name = 'cardwrapper';
  template = `
  <section class="cardwrapper">
    [volatile]
  </section>
  `;
}