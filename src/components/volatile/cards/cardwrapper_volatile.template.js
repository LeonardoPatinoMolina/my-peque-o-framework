import { VolatileComponent } from "../../../lib/leoframe.js";

export class VolatileCardWrapperComponent extends VolatileComponent{
  name = 'cardwrapper_volatile';

  //nos aseguramos que los componentes hijos sean abisados del desmonte ya que estos este componente posee hijos con rules,
  //los cuales están sujetos a monte y desmonte continuo
  didMount = async ()=>{
    super.didMount();
  }
  didUnmount = async ()=>{
    super.didUnmount();
  }

  template() {
    return super.template(`
    <div data-key="${this.key}" class="cardvolatile_wrapper">
      [volatile]
    </div>
    `);
  };
}