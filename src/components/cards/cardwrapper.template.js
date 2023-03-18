import { VolatileComponent } from "../../lib/leoframe.js";

export class CardWrapperComponent extends VolatileComponent{
  name = 'cardwrapper';
  template(){
    return super.template(`
    <section class="cardwrapper">
      [volatile]
    </section>
    `);
  }
}