import { Component } from "../../../lib/leoframe.js";

export class NOtDataComponent extends Component {
  name = 'notdata';

  template(){
    return super.template(`
    <div 
    style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;"
    >No hay datos...</div>
    `)
  }
}