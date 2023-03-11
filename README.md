# __Mi pequeño framework font-end__
## __My Movie__
El presente ejercicio tiene como finalidad poner en práctica conocimientos aprendidos en __javascript__, __html__ y __scss__, para esto me he propuesto crear mi propio framework en JS, la idea es crear una página estática, pero manteniendo un desarrollo modular con componentes.

## __Sobre el framework__
Consiste en un conjunto de lineamientos, técnicas y herramientas que diseñé para construir la interfáz de la página por composición, para ello separé cada fragmento de las etiquetas ``html`` en su propio fichero, es decir, modularizé cada parte de la vista en componentes. 
### __Reglas y estructura__
Mi framework mantiene el enfoque de página única _(SPA)_, esto implica que requiere de un archivo __index.html__ en la raiz de la aplicación, este debe tener como minimo una etiqueta raiz la cual debe poseer un id _"root"_ ejemplo:
~~~html
<div id="root"></div>
~~~
El contenido de esta etiqueta raíz será el administrado desde _javascript_, es decir, esta será la raiz de todos los árboles de componentes.

Además de esto, este framework permite establecer una estructura fija para algunos arboles de componentes, a esto le llamé __Layout__, cada arbol de componentes que siempre es administrado una sola véz y no está sujeto a cambio es un __TreeLayoutComponent__ estos arboles tienen su propia etiqueta raíz y esta etiqueta está identificada por el nombre del arbol, generalemnte se trata de partes tipicas de la página, como los _header_ o _footer_ ejemplo:
~~~html
<div id="header"></div>
~~~
La gran diferencia que tiene esta etiqueta con la anterior es que esta no contendrá el arbol del layout sino que será reemplazada por él.

#### Raiz relativa
Contamos además con una _raiz relativa_ , esta corresponde a un componente especifico que cumple el rol de padre, si un componente desea tener componentes hijos, debe poseer de forma explicita la raiz. Mi pequeño framework tiene como restricción que a cada hijo le corresponde su propia raíz y cuenta con la siguiente sintaxis:
~~~html
<div class="root1"></div>
<div class="root2"></div>
~~~
La sintaxis difiere de las anteriores en que esta posee una _clase_ en lugar de _id_ y además de la palabra root está acompañada con un ``número``, este es necesario para diferenciarla de las otras raizes de otros hijos. En ese caso hay dos raices, es decir es habrán dos hijos.
De esta forma el componente con rol de padre necesita tener en su sintaxis esta etiqueta de raíz, y de igual forma que la raíz de layout esta será reemplazada por el arbol de componentes que la ocupe.

### __Herramientas__

Para manipular los componentes, los cuales consisten en fragmentos de html en su fichero determinado, diseñé unas cuantas clases que permiten darle un contexto y relacionarlos en una sintaxis de tenga sentido, estas son:
#### __Component__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en javascript 
export class Component {
  public readonly name: string;
  private path: string;
  public children: Component[] = [];
  public body: HTMLElement;
  public readonly rootNumber: number | boolean;
  constructor({ 
    name, 
    path, 
    rootNumber }:{
      name: string,
      path:string, 
      rootNumber: number
    })
  //método
  public build({
    parent: HTMLElement | boolean, 
    childBuilder: (component: Component)=> void
  }): Promise<Component>
  //método
  public create(): Promise<HTMLElement>
  //método
  private string2html(str: string): HTMLElement
}
~~~
  
  Esta clase se encarga de darle cuerpo a cada componente y es a base de ella que podemos acoplarlo al arbol de componentes.
  #### <u>estructura</u>
  ``name:`` nombre del componente, este debe ser el mismo del fichero donde está almacenada la sintaxis html.
  
  ``path:`` ruta donde está almacenado el fichero del componente html, lo diseñé de esta forma pada que la ubicación de los componentes no fuera algo estrcito. la ruta debe finalizar con "/" y no debe contener el nombre del archivo solo de los directorios.

  ``children:`` hijos directos del componente;

  ``body:`` elemento html del componente, es decir, el nodo que representa.

  ``rootNumber:`` hace referencia a su ubicación relativa en su padre. recordando que este framework tiene como enfoque la composición, cada componente puede ser parte de otro, la relación que nace de esta característica es la de _padre_ e _hijo_. Todo componente tiene implicito el rol de hijo, si en dado caso tratamos con un componente que no tiene padre, podemos establecer este atributo en __false__, caso contrario, se debe hacer referencia al lugar del padre donde el comoponente se acoplará, para ello el padre emplea la __[Raíz relativa](#raiz-relativa)__ que mencionamos anteriormente.

``create():`` método encargado de crear completamentre el componente. Como mencioné anteriormente cada componente está modularizado en su porpio archivo html, en algún momento esta sintaxis debe ser acoplada a su respectivo árbol. Esta función se encarga de ello, debido a que es una operación asíncrona,función requiere de un adadminstración especial la cual se realiza desde el arbol en sí

``build():`` metodo encargado de ensamblar toda la esctructura de su composición, si la composición establece un padre o hijo, este método los ubica en su lugar, es gracias a este pequeño método que pude dar orden a las relaciones de composición de mi pequeño framework, de su funcionalidad resulta una estrcutura compleja de componentes que facilita la gerarquía y cronología a la hora de renderizar el arbol.

#### __TreeComponent__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en javascript 
class TreeComponent {
  componentsNodes: HTMLElement[] = [];
  private nodes: Component[] = [];
  private root: DocumentFragment = new DocumentFragment();
  public readonly name: string;
  constructor({
    name, 
    children}:{
      name: string, 
      children: HTMLElement[]
    });
  //método
  public render(): Promise<void>
  //método
  private assemble(): void
  //método
  private recurseAssemble(
    parent: HTMLElement, 
    component: Component): void;
  //método
  public remove(): void;
}
~~~
  Esta clase tiene como finalidad establecer una raiz a cada componente, es decir, es la clase que ensambla cada arbol de componentes, igualmente es responsable de renderizar el arbol en el DOM.
#### __TreeLayoutComponent__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en javascript 
class TreeLayoutComponent extends TreeComponent {
  //método sobreescrito
  private assemble(): void
}
~~~
  Esta clase tiene exactamente las mismas funcionalidades que __TreeComponent__, de hecho es una su clase hija, pero tiene como diferencia que a la hora de renderizarse lo hace según la estructura preestablecida en el DOM, es por esta razón que sobreescribimos el método assemble.
#### __Pagination__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en javascript 
class Pagination {
  private currentPage;
  private home;
  private pages = [];
  constructor({
    home, 
    pages}:{
      home: TreeComponent, 
      pages: TreeComponent[]});
  //método
  jumpToTree(treeName: string): void
  //método
  comeHome(): void
}
~~~
Esta clase es encargada de manipular el contenido de la etiqueta raiz de los TreeConponent. Ya que se trata del contenido principal de la página, le atribuje a esta clase el decoroso nombre de __paginación__ y su implementación se asemeja a un sistema de enrutamiento, pero por supuesta para nada sofisticado.
### __Sintaxis__
La sintaxis que diseñé para maquetar el árbol de componentes está inspirada en los arboles de Widgets de flutter, aquí un pequeño ejemplo de un arbol de componentes en mi framework:

~~~javascript
import { Component, TreeComponent } from "my_framework";

export const Header = new TreeLayoutComponent({
  name: 'header',
  children: [
    new Component({
      name: "header",
      path: "/src/components/navbar/",
      rootNumber: false,
    }).build({
      parent: false,
      childBuilder: (parent) => {
        new Component({
          name: "inputsearch",
          path: "/src/components/navbar/",
          rootNumber: 1,
        }).build({ parent });
        new Component({
          name: "nav",
          path: "/src/components/navbar/",
          rootNumber: 2,
        }).build({ parent });
      },
    }),
  ],
});
~~~