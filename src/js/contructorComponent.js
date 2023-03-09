"use strict"
import {$} from './utils.js';

/**
 * función encarda de convertir una cana de texto en un componente de html
 * @param {string} str 
 * @returns 
 */
const string2html = (str)=>{
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, 'text/html');
  return doc.body.children[0];
}

/**
 * Clase encargada proveer las herramientas necesarias para crear
 * cada componente
 */
export class ComponentsMaker {
  handlers = [];
  /**
   * Este método se encarga de ubicar el archivo con el componente html en la ruta 
   * "src/components", para ello requiere el nombre del archivo que lo contiene incluyendo su extención
   * @param {string} componentFileName nombre de archivo html con el componente
   */
  create(componentFileName){
    const handler = new Promise((resolve, reject)=>{
      const reader = new XMLHttpRequest();
      reader.open('GET',`src/components/${componentFileName}`, true);
      reader.send();
      reader.onreadystatechange = ()=>{
        if(reader.readyState === 4 && reader.status === 200){
          const componentNode = string2html(reader.responseText)
          resolve(componentNode);
        }if(reader.readyState === 4 && reader.status !== 200){
          reject('incorrecto'+`${reader.responseText.slice(0,15)}`)
        }
      }
    })
    this.handlers.push(handler);
  }

  /**
   * Método encargado de ensamblar cada componente en el nodo raíz,
   * el orden en que lo hará depende del orden en el que fue
   * creado cada componente con el método "create"
   */
  build = async () => {
    try {
      const fragment = new DocumentFragment();
      for (const handler of this.handlers) {
        const response = await handler;
        fragment.append(response);
      }
      $('#root').appendChild(fragment);
    } catch (error) {
      console.error(error);      
    }
  } 
}
