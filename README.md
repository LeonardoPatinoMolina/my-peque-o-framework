# __Mi pequeño framework font-end__
## __My Movie__
El presente ejercicio tiene como finalidad poner en práctica conocimientos aprendidos en __JavaScript__, __HTML__ y __scss__, para esto me he propuesto crear mi propio framework en JS, la idea es crear una página estática, pero manteniendo un desarrollo modular con componentes.

## __Sobre el framework__
Consiste en un conjunto de lineamientos, técnicas y herramientas que diseñé para construir la interfaz de la página por composición, para ello separé cada fragmento de las etiquetas ``HTML`` en su propio fichero, es decir, modularicé cada parte de la vista en componentes. 
### __Reglas y estructura__
Mi framework mantiene el enfoque de página única _SPA_, esto implica que requiere de un archivo __index.html__ en la raíz de la aplicación, este debe tener como mínimo una etiqueta raíz la cual debe poseer un id _"root"_ ejemplo:
~~~html
<div id="root"></div>
~~~
El contenido de esta etiqueta raíz será el administrado desde _JavaScript_, es decir, esta será la raíz de todos los árboles de componentes.

Además de esto, este framework permite establecer una estructura fija para algunos árboles de componentes, a esto le llamé __Layout__, son aquellos que son administrado una sola vez y no están sujeto a cambio, en cpodigo es represntado por la clase __TreeLayoutComponent__ estos árboles tienen su propia etiqueta raíz y esta etiqueta está identificada por el nombre del árbol, generalmente se trata de partes típicas de la página, como los _header_ o _footer_ ejemplo:
~~~html
<div id="header"></div>
~~~
La gran diferencia que tiene esta etiqueta con la anterior es que esta no contendrá el árbol del componentes sino que será reemplazada por él.

#### Raíz relativa
Contamos además con una _raíz relativa_ , esta le pertenece a un componente especifico que cumple el rol de __padre__, si un componente desea tener componentes hijos, debe poseer de forma explícita las raices. Mi pequeño framework tiene como restricción que a cada hijo le corresponde su propia raíz y cuenta con la siguiente sintaxis:
~~~html
<div class="root1"></div>
<div class="root2"></div>
~~~
La sintaxis difiere de las anteriores en que esta posee una _clase_ en lugar de _id_ y además de la palabra root está acompañada con un ``número``, este es necesario para diferenciarla de las otras raíces de otros hijos. En ese caso hay dos raíces, es decir, habrá dos hijos.
De esta forma el componente con rol de padre necesita tener en su sintaxis esta etiqueta de raíz, y de igual forma que la raíz de layout esta será reemplazada por el árbol de componentes que la ocupe.

### __Herramientas__

Para manipular los componentes, los cuales consisten en fragmentos de HTML separados en __templates__, diseñé unas cuantas clases que permiten darle un contexto y relacionarlos en una sintaxis de tenga sentido, estas son:
#### __Component__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en JavaScript 
export class Component {
  public readonly name: string;
  private path: string;
  public children: Component[] = [];
  public body: HTMLElement;
  public readonly rootNumber: number | boolean;
  constructor({ 
    name, 
    rootNumber,
    templatePath,
    props }:{
      name: string,
      path:string, 
      rootNumber: number,
      templatePath: string,
      props?: {[string]:any}
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
  
  Esta clase se encarga de darle cuerpo a cada componente y es a base de ella que podemos acoplarlo al árbol de componentes.
  #### <u>estructura</u>
  ``name:`` nombre del componente, este debe ser el mismo del fichero donde está almacenada la sintaxis HTML.
  
  ``templatePath:`` ruta donde está almacenado el fichero de la template HTML, lo diseñé de esta forma para que lapágina no importe los scripts de javascript sinno hasta que deban usarse, por ello conviene mantener referencias de los ficheros a la hora de estructurar los arboles, de este modo los ficheros solo son importador cuando el arbol se renderiza, aliviando así la carga del navegador. la ruta debe finalizar con "/" y no debe contener el nombre del archivo solo de los directorios.

  ``children:`` hijos directos del componente;

  ``body:`` elemento HTML del componente, es decir, el nodo que representa.

  ``rootNumber:`` hace referencia a su ubicación relativa en su padre. recordando que este framework tiene como enfoque la composición, cada componente puede ser parte de otro, la relación que nace de esta característica es la de _padre_ e _hijo_. Todo componente tiene implícito el rol de hijo, si en dado caso tratamos con un componente que no tiene padre, podemos establecer este atributo en __false__, caso contrario, se debe hacer referencia al lugar del padre donde el componente se acoplará, para ello el padre emplea la __[Raíz relativa](#raiz-relativa)__ que mencionamos anteriormente.

  ``props:`` propiedades iniciales que arantizan la posibilidad de reutilizar el componente, esta es una de las ventajas por las que opté por este tipo de diseño, el componente no está obligado a poseer props, por ello son opcionales. Sin embargo, el componente tambien cuenta con props globales, las cuales provienen del arbol al que pertenece
  

``create():`` método encargado de crear completamente el componente. Como mencioné anteriormente cada componente está modularizado en su propio archivo HTML, en algún momento esta sintaxis debe ser acoplada a su respectivo árbol. Esta función se encarga de ello, debido a que es una operación asíncrona requiere de una administración especial la cual se realiza desde el árbol en sí

``kinship():``método encargado de generar relaciones de parentesco, es gracias a este pequeño método que pude dar orden a las relaciones de composición de mi pequeño framework, de su funcionalidad resulta una estructura compleja de componentes que facilita la jerarquía y cronología a la hora de renderizar el árbol.

#### __TreeComponent__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en JavaScript 
class TreeComponent {
  public readonly name: string;
  private componentsNodes: Component[] = [];
  private root: DocumentFragment = new DocumentFragment();
  private rulesScript: HTMLElement;
  public readonly globalProps: {[string]:any}
  constructor({
    name, 
    children,
    rulesScript,
    globalProps}:{
      name: string, 
      children: HTMLElement[],
      rulesScript: HTMLElement,
      globalProps?: {[string]:any}
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
  //método
  public setProps(props: {[string]:any}): TreeComponent;
}
~~~
  Esta clase tiene como finalidad establecer una raíz a cada componente, es decir, es la clase que ensambla cada árbol de componentes, igualmente es responsable de renderizar el árbol en el DOM.
  #### <u>estructura</u>
  ``name:`` nombre de árbol de componentes, este nombre es relevante ya que la paginación lo utiliza como referencia.
  
  ``componentsNodes:`` componentes nodo del árbol, hace referencia a la estructura compleja de componentes que representan el árbol.

  ``root:`` raíz del árbol, hace referencia a la estructura final del árbol, este atributo es de suma importancia ya que en él está toda la estructura que será inyectada en el DOM.

  ``rulesScript:`` nodo script que contiene la lógica perteneciente al arbol de componentes, esta es parte del diseño de importación de scripts por demanda, de esta forma la página no conocerá lógica de arboles que no se hayan renderizado.

  ``globalProps:`` se trata de un objeto con props que puede ser inyectado en el árbol al momento de su declaración de forma opcional, la utilidad de este atributo es que será distribuido a travéz de todos sus componentes hijos.

  ``render():`` método encardado de renderizar todo el árbol, este método es delicado porque es el encardado de ejecutar todas las operaciones asíncronas del árbol, esto incluye los métodos _create()_ de cada componente en sus nodos, este método establece el orden en el que se renderiza toda la vista, basado por supuesto en la estructura compleja que se fue estableciendo en la composición.

  ``assemble(), recurseAssemble():`` estos métodos trabajan en conjunto, y se encargan de complementar el renderizado de la vista que inicia el método _render()_. _assemble()_ se encarga de anidar cada componente hijo en su padre respetando todas las reglas mencionadas hasta ahora, debido a que la estructura anidada requiere de iteraciones cada vez más específicas, abstraemos el proceso con _recurseAssemble()_.

  ``remove():`` método encargado de remover el arbol de componentes del DOM, esto incluye el script de lógica.

  ``setProps():`` método que permite establecer las props globales en el arbol, esto con el propósito de poder inyectar props al momento de renderizar el arbol.

#### __TreeLayoutComponent__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en JavaScript 
class TreeLayoutComponent extends TreeComponent {
  //método sobre escrito
  private assemble(): void;
}
~~~
  Esta clase tiene exactamente las mismas funcionalidades que __TreeComponent__, de hecho es una su clase hija, pero tiene como diferencia que a la hora de renderizarse lo hace según la estructura preestablecida en el DOM, es por esta razón que sobrescribimos el método assemble.
  #### <u>estructura</u>
  La estructura es exactamente la misma que su clase padre con una diferencia. Los árboles de componentes comunes se ensamblan en la raíz principal, pero este árbol pertenece a la estructura Layout, por ello se ensambla en una raíz especifica, el método responsable de ensamblar el árbol en su raíz es _assemble()_, por ello, basta con sobre escribir este método apuntando ahora a la raíz layout.

#### __Pagination__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en JavaScript 
class Pagination {
  private currentPage: TreeComponent;
  private home: string;
  private pages: {[string]: any};
  constructor({
    home, 
    pages}:{
      home: string, 
      pages: {[string]: any}});
  //método
  jumpToTree(treeName: string): Promise<void>;
  //método
  comeHome(): Promise<void>;
  //método
  init(): Promise<void>
}
~~~
Esta clase es encargada de manipular el contenido de la etiqueta raíz de los TreeConponent. Ya que se trata del contenido principal de la página, le atribuí a esta clase el decoroso nombre de __paginación__ y su implementación se asemeja a un sistema de enrutamiento, pero por supuesta para nada sofisticado.
  #### <u>estructura</u>
``currentPage:`` hace referencia al árbol de componentes que está renderizado.

``home:`` nombre del arbol de componentes predeterminado como renderizado inicial.

``pages:`` componentes dispuestos a participar de la paginación, es decir, su renderización está a manos de esta clase, estos se estructuran con _clave_ y _valor_, donde la clave es el nombre del arbol y el valor es la ruta del fichero que lo contiene, este diseño sigue la técnica previamente mencionada de importar scripts por demanda.
  
``jumpToTree():`` método encargado de cambiar el árbol renderizado por otro que se le especifique.

``comeHome():`` método encargado de renderizar siempre el árbol de componentes predeterminado como inicial, desrenderizando cualquier otro que se encuentre renderizado en el momento.

### __Sintaxis__
La sintaxis que diseñé para maquetar el árbol de componentes está inspirada en los árboles de Widgets de __flutter__, aquí un pequeño ejemplo de un árbol de componentes en mi pequeño framework:

 <u>Layout</u>
~~~javascript
import { Component, TreeComponent } from "my_framework";

const Header = new TreeLayoutComponent({
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

export default Header;
~~~
Podemos ver que el arbol está siendo exportado por default, hacemos esto para dotarlo del caracter modular necesario para poder importar su contenido por demanda cuando se requiera

 <u>paginación</u>
~~~JavaScript
export const Router = new Pagination({
  home: home,
  pages: {
    home: 'home.page.js',
    pupularmovies: 'movies/popularmovies.page.js',
    ratedmovies: 'movies/ratedmovies.page.js',
  }
})
~~~
En la sintaxis de _paginación_ podemos apreciar como el atributo ``pages`` contiene en la "key" el nombre de arbol de componentes y en su "value" la ruta, esta ruta tiene por supuesto que el directorio que los contiene es: __pages/__
