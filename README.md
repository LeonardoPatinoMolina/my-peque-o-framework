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
El contenido de esta etiqueta raíz será el administrado desde _JavaScript_, es decir, esta será la raíz de todos los árboles de componentes abiertos al cambio.

Además, este framework permite establecer una estructura `fija` para algunos árboles de componentes, a esto le llamé __Layout__, son aquellos que cuentan con una raíz exclusiva y no están sujeto a mucho cambio, sin embargo, su principal carácteristica es que están disponibles siempre en la aplicación, en código es represntado por la clase __TreeLayoutComponent__ la etiqueta raíz de estos árboles está identificada por el nombre del árbol, generalmente se trata de partes típicas de la página, como los _header_ o _footer_ ejemplo:
~~~html
<div id="header"></div>
~~~
#### Coponentes
Por su parte, los componetes se dividen en dos clases __Component__ y __VolaitileComponent__, El primero es el componente común, tiene la tarea de representar estructuralmente un fragmento de la página, para ello se vale de plantillas de ``html`` para la declaración de sintáxis. Los componentes pueden tener en su estructura componentes hijos, los cuales pueden ser cualquiera de los dos previamente mencionados. El componente volatil realiza las mismas tareas que un componente comun pero guarda dos diferencias fundamentales: 

|Caracteristica|Component|VolatileComponent|
|---|---|---|
|Hijos|La cantidad de hijos se conoce en todo momento. Una véz declarados no puede cambiar.|La cantidad de hijos es desconocida, arbitraria y dinámica.|
|Raices|todas las raices deben estar declaradas previamente de forma explicita en la plantilla| Las raices son generadas dinámicamente en base a la cantidad actual de hijos|
|Ventajas|El lugar que ocupará un hijo en la estructura puede definirse claramente, permitiendo un acoplamiento complejo de componentes hijos|La cantidad de hijos es dinámica, no hace falta preocuparse por una declaración explicita de todas las raices|
|desventajas|La cantidad de hijos no varía en el tiempo, el acoplamiento al componente padre suele ser especifico y estático.| Es imposible acoplar hijos en distintos lugares del padre ya que todas las raices son generadas en un solo lugar, no es muy util para diseños de acoplamiento de hijos muy complejo.

Encontramos más detalles diferenciadores en las raices de componentes: 
#### Raíz relativa
Una _raíz relativa_ , pertenece a un componente especifico que cumple el rol de __padre__, si un componente desea tener componentes __hijos__, debe poseer de forma explícita las raices de los mismos. Mi pequeño framework tiene como restricción que a cada hijo le corresponde su propia raíz y cuenta con la siguiente sintaxis:
~~~html
<div class="root1"></div>
<div class="root2"></div>
~~~
La sintaxis difiere de las anteriores en que esta posee una _clase_ en lugar de _id_ además que la palabra root está acompañada con un ``número``, este es necesario para diferenciarla de las otras raíces de otros hijos. En ese caso hay dos raíces, es decir, habrá dos hijos.
El componente con rol de __padre__ necesita tener en su sintaxis estas etiquetas de raíz ya que es el punto de referencia del componente hijo para acoplarse; una vez llegado el momento, la raíz será reemplazada por el componente dejando una estrucutura limpia.

#### Raíz volatil
la raíz volatil Es una declaración abstracta de lo que será el lugar de origen en el cual serán generadas las __raices relativas__ dinámicamente, esto por supuesto es algo propio de un ``componente volatil``, su sintaxis es la siguiente:
~~~HTML
<div class="parent">
  [volatil]
</div>
~~~

### Props y globalProps
La _props_ son datos puntuales de iterés para el componete o el árbol que las posee, consisten en un objeto con __datos premitivos__ que serán eventualmente injectados en el comonente, la forma para declararlo en la pnatilla es con el nombre de la porp encerrada en llaves ``"{}"``, ejemplo:
~~~HTML
<div>
  {name}
  <div>
    {email}
  </div>
</div>
~~~
Esto establece la ubicación de cada prop injectada en el momento de renderizar el componente.

### __Herramientas__

Para manipular los componentes, los cuales consisten en fragmentos de HTML separados en __templates__, diseñé unas cuantas clases que permiten darle un contexto y relacionarlos en una sintaxis de tenga sentido, estas son:
#### __Component__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en JavaScript 
export class Component {
  public readonly name: string;
  private templatePath: string;
  public body: HTMLElement;
  public children: Component[] = [];
  public builder: ()=>Promise<void>;
  constructor({ 
    name, 
    templatePath,
    props,
    children,
    builder }:{
      name: string,
      templatePath: string,
      props?: {[string]:any},
      children: Component[],
      builder: (
        component: Component, 
        treeProps: {[string]:any}
      )=>Promise<void>}
    })
  //método
  public create(externProps: {[string]:any}): Promise<void>
  //método
  public update({newProps}:{[string]:any}): Promise<void>
  //método
  private string2html(str: string): HTMLElement
}
~~~
  
  Esta clase se encarga de darle cuerpo a cada componente y es a base de ella que podemos acoplarlo al árbol de componentes.
  #### <u>estructura</u>
  ``name:`` nombre del componente, este debe ser el mismo del fichero donde está almacenada la plantilla HTML.
  
  ``templatePath:`` ruta donde está almacenado el fichero de la template HTML, lo diseñé de esta forma para que la página no importe los scripts de javascript sino hasta que deban usarse, por ello conviene mantener referencias de los ficheros a la hora de estructurar los arboles, de este modo los ficheros solo son importador cuando el arbol se renderiza, aliviando así la carga del navegador. la ruta debe finalizar con "/" y no debe contener el nombre del archivo solo el de los directorios.


  ``body:`` elemento HTML del componente, es decir, el nodo que representa.

  ``props:`` propiedades injectadas que garantizan la posibilidad de reutilizar el componente, esta es una de las ventajas por las que opté por este tipo de diseño, el componente no está obligado a poseer props, por ello son opcionales. Sin embargo, el componente tambien cuenta con props globales, las cuales provienen del arbol al que pertenece
  
  ``children:`` hijos directos del componente;

  ``builder:`` este atributo es especial, consiste en un callback _asíncrono_, este es ejecutado internamente en la clase Component y en dicho contexto recibe por inyección sus los parámetros, su objetivo es construir algunos aspectos del componente, ya que desde este callback tenemos acceso a una referencia del componente mismo, podemos inyectar props, o hijos; ya ejemplificaré un uso práctico para este atributo.

``create():`` método encargado de crear completamente el componente. Como mencioné anteriormente cada componente está modularizado en su propia plantilla, en algún momento esta sintaxis debe ser acoplada a su respectivo árbol. Esta función se encarga de ello. Debido a que es una operación asíncrona requiere de una administración especial la cual se realiza desde el árbol en sí.

``update():`` método especial encargado de re renderizar un componente específico, el componente que use este metodo realizará el proceso de creación y ensamble, sin embargo, posee limitaciones, este componente estará aislado de las props globales del árbol, en su defecto el método admite como parametro props nuevas las cuales estarán accesibles el todo el componente incluyendo sus hijos.

``string2html:`` método utilidad 

#### __TreeComponent__
~~~typescript
//sintaxis en typescript con fines descriptivos
//la sintaxis originas está escrita en JavaScript 
class TreeComponent {
  public readonly name: string;
  private rulesScript: HTMLElement;
  public readonly globalProps: {[string]:any};
  private children: Component[] = [];
  private root: DocumentFragment = new DocumentFragment();
  constructor({
    name, 
    children,
    rulesScript,
    globalProps}:{
      name: string, 
      globalProps?: {[string]:any}
      children: Component[],
      rulesScript: HTMLElement,
    });
  //método
  public setProps(props: {[string]:any}): TreeComponent;
  //método
  public render(): Promise<void>
  //método
  private assemble(): void
  //método
  private recurseAssemble(component: Component): void;
  //método
  public remove(): void;
}
~~~
  Esta clase tiene como finalidad establecer una raíz a cada componente, es decir, es la clase que ensambla cada árbol de componentes, igualmente es responsable de renderizar el árbol en el DOM.
  #### <u>estructura</u>
  ``name:`` nombre de árbol de componentes, este nombre es relevante ya que la paginación lo utiliza como referencia.
  
  ``children:`` componentes nodo del árbol, hace referencia a la estructura compleja de componentes que representan el árbol, en esencia se trata un arreglo de componentes.

  ``ruleScript:`` de ser necesario, un árbol puede contar con lógica y funcionalidad, para ello podemos dedicar un __ruleScript__ se trata de una etiqetascript que hace referencias a los scripts que contienen el código con las _reglas_ del árbol, generalmente consiste en _eventos escucha_ y demás funciones propias de javascript.

  ``root:`` raíz del árbol, hace referencia a la estructura final del árbol, este atributo es de suma importancia ya que en él está toda la estructura que será inyectada en el DOM.

  ``globalProps:`` se trata de un objeto con props que puede ser inyectado en el árbol al momento de su declaración de forma opcional, la utilidad de este atributo es que será distribuido a travéz de todos sus componentes hijos.

  ``setProps():`` método que permite establecer las props globales en el arbol, esto con el propósito de poder inyectar props al momento de renderizar el arbol.

  ``render():`` método encardado de renderizar todo el árbol, este método es delicado porque es el encardado de ejecutar todas las operaciones asíncronas de los componentes del arbol, esto incluye los métodos _create()_ y _assemble_ de cada componente en sus nodos, este método establece el orden en el que se renderiza toda la vista, basado por supuesto en la estructura compleja que se fue estableciendo en la composición.

  ``assemble(), recurseAssemble():`` estos métodos trabajan en conjunto, y se encargan de complementar el renderizado de la vista que inicia el método _render()_. _assemble()_ se encarga de anidar cada componente hijo en su padre respetando todas las reglas mencionadas hasta ahora, debido a que la estructura anidada requiere de iteraciones cada vez más específicas, abstraemos el proceso con _recurseAssemble()_.

  ``remove():`` método encargado de remover el arbol de componentes del DOM, esto incluye el script de lógica.

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

__layout__
~~~Javascript
import { Component, TreeLayoutComponent, VolatileComponent } from "my_framework.js";

const rulesScript = document.createElement("script");
rulesScript.src = "src/pages/layout/header/rules/index.js";
rulesScript.type = "module";
rulesScript.defer = true;

export const Header = new TreeLayoutComponent({
  name: "header",
  rulesScript,
  children: [
    new VolatileComponent({
      props: { title: "Movies" },
      name: "header",
      templatePath: "components/layout/header/",
      children: [
        new Component({
          name: "nav",
          templatePath: "components/layout/header/",
        }),//end component
        new Component({
          name: "subnav",
          templatePath: "components/layout/header/",
          props: {
            className: "subnav_movies",
            opction1: "Popular",
            opction2: "Mejores",
            opction3: "Próximamente",
          },
        }),//end component
      ],
    }),//end component
  ],
});//end tree
~~~
En este caso podemos ver desde arriba hacia abajo la creación del script de las reglas del árbol, estas luego son incluidas en la declaración del __TreeLayoutComponent__ a traves de su constructor. Este árbol cuenta con un hijo directo, en este caso un componente volatil, el cual tiene dos hijos directos, recordando que la cantidad es totalmente arbitraria, fácilmente podrían ser 3 o 4.

__TreeComponent__
~~~javascript
import { APIKEY } from 'privateGlobal';
import { Component, TreeComponent } from 'my_framework';
import { MoviePropsPage } from '../adapter/moviePage.js';

const builder = async (component, treeProps)=>{
  const url = `https://api.themoviedb.org/3/movie/${treeProps.id}?api_key=${APIKEY}&language=es-ES`;

  const response = await fetch(url);
  const movieDetail = await response.json()
  component.props = new MoviePropsPage(movieDetail).data
}

const Movie = new TreeComponent({
  name: 'movie',
  children: [
    new Component({
      name: 'page',
      templatePath: 'components/page/',
      builder
    })
  ]
});

export default Movie;
~~~
En este caso particular utilizamos el atributo builder, este ejemplo muestra como podemos establecer props en un componente cuando provienen de un servicio externo _api Restful_.
Al go a resaltar es que el arbol está siendo exportado por default, esto es necesario en todo componente que busque participar de la navegación, es decir, la clase __Pagination__ exige este tipo de declaración para funcionar.

__paginación__
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
En la sintaxis de _paginación_ podemos apreciar como el atributo ``pages`` contiene en la "key" el nombre de arbol de componentes y en su "value" la ruta, esta ruta tiene por supuesto que el directorio que los contiene es: __pages/__, y como se mencionó previamente, todos estos son árboles que están siendo exportados por default en sus respectivos scripts
