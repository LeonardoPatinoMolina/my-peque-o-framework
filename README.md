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
La clase _Component_ es la encargada de abstraer las funcionalidades y propiedades de cada componente, el enfoque que tomé fue el de componentes de clase, de modo que cada nuevo componente debe heredar de esta clase para su implementación.
~~~typescript
export class Component {
  public readonly name: string = 'componente';
  public body: HTMLElement;
  public children: Component[] = [];
  public $builder: (
    component: Component, 
    treeProps: {[string]:any})=>Promise<void>;
  constructor(args: { 
    key?: string | number,
    children?: Component[],
    props?: {[string]:any},
    builder?: (
        component: Component, 
        treeProps: {[string]:any}
      )=>Promise<void>} 
    })

  //method
  public didMount: ()=>Promise<void>
  //method
  public didUnmount: ()=>Promise<void>
  //method
  public template: (template: string)=> string;
  //method
  public setProps(props: {[string]:any}): Component
  //method
  public setChildren(children: Component[]): Component
  //method
  public create(externProps: {[string]:any}): Promise<void>
  //method
  public update({newProps}:{[string]:any}): Promise<void>
}
~~~

  #### <u>estructura</u>
  ``name:`` nombre del componente, este debe ser el mismo del fichero donde está almacenada la plantilla HTML.

  ``body:`` elemento HTML del componente, es decir, el nodo que representa.

  ``props:`` propiedades inyectadas que garantizan la posibilidad de reutilizar el componente, esta es una de las ventajas por las que opté por este tipo de diseño, el componente no está obligado a poseer props, por ello son opcionales. Sin embargo, el componente tambien cuenta con props globales, las cuales provienen del arbol al que pertenece. este es un dato que persiste aún si el componente está renderizado o no, razón por la cual cumple el rol de estado del componente.
  
  ``children:`` hijos directos del componente;

  ``$builder:`` este atributo cuenta con un __$__ en su nomenclatura, decidí que este signo refiera a los atributos _callback_ de la clase con miras a la posible añadidura de más atributos de esta naturaleza. Este es ejecutado internamente en la clase Component y en dicho contexto recibe por inyección sus los parámetros, su objetivo es construir algunos aspectos del componente, en su _scope_ hay acceso a una referencia del componente mismo, y con él podemos inyectar props, o hijos; ya ejemplificaré un uso práctico para este atributo.

  ``didMount():`` este método se ejecuta automáticamente una vez que el componente a sido renderizado, claramente es inspiración de __React.js__ :). El propósito general de este método es añadir eventos escucha e iniciar cualquier asunto de interés para el componente
  
  ``didUnount():`` este método se ejecuta automáticamente una vez que el componente a sido des-renderizado, claramente es inspiración de __React.js__ :). El propósito general de este método es remover culaquier _EventListener_ o resolver cualquier asunto que se encuentre vigente y no se requiera en otro lugar.

  ``template():`` método encargado de ensamblar aspectos relevantes de la plantilla como pueden ser la inyeccion de props y raices, este método es reescrito en cada componente que extienda las clases __Component__ o __VolatileComponent__, para declarar su prpopia plantilla, la cual consiste en una plantilla literal que contiene toda la sintaxis html necesaria para montar el componente.

``create():`` método encargado de crear completamente el componente. Como mencioné anteriormente cada componente representa un nodo _HTML_ a través de su __template__, en algún momento esta sintaxis debe ser acoplada al _DOM_. Esta función se encarga de ello. Debido a que es una operación asíncrona requiere de una administración especial la cual se realiza desde el árbol en sí.

``setChildren()``: método encargado de establecer los componentes hijos, de esta forma el componente podrá recibir props al momento de ser invocado

``update():`` método especial encargado de re-renderizar un componente específico, el componente que use este metodo realizará nuevaente el proceso de creación y ensamble, sin embargo, posee limitaciones: el componente estará aislado de las props globales del árbol, en su defecto el método admite como parametro props nuevas, las cuales, estarán accesibles en todo el componente incluyendo sus hijos.

#### __VolatileComponent__
Esta clase extiende, es decir, hereda de la clase _Component_ cuenta exactamente con las mismas características con una diferencia: implementa el método _template()_ de forma ligeramente distinta, mientras que el método en la clase Component inyecta los hijos del componente en raices prestablecidas, este primero las genera para poder inyectar una cantidad arbitraria, en otras palabras, las raices volatiles "[volatile]" requieren un trato distinto a las raices relativas directas "[child0]".
~~~Typescript
class VolatileComponent extends Component{
  //override method
  public template(template: string): string;
}
~~~

#### __TreeComponent__
La clase _TreeComponent_ abstrae las funcionalidades y propiedades de un árbol de componentes. Su finalidad establecer una raíz a cada componente, es decir, es la clase que ensambla cada árbol de componentes, igualmente es responsable de renderizar el árbol en el DOM.
~~~typescript
class TreeComponent {
  public readonly name: string;
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
  //method
  public setProps(props: {[string]:any}): TreeComponent;
  //method
  public render(): Promise<void>
  //method
  private assemble(): void
  //method
  private recurseAssemble(component: Component): void;
  //method
  public remove(): void;
}
~~~
  #### <u>estructura</u>
  ``name:`` nombre de árbol de componentes, este nombre es relevante ya que la paginación lo utiliza como referencia.
  
  ``children:`` componentes nodo del árbol, hace referencia a la estructura compleja de componentes que representan el árbol, en esencia se trata un arreglo de componentes.

  ``root:`` raíz del árbol, hace referencia a la estructura final del árbol, este atributo es de suma importancia ya que en él está toda la estructura que será inyectada en el DOM.

  ``globalProps:`` se trata de un objeto con props que puede ser inyectado en el árbol al momento de su declaración de forma opcional, la utilidad de este atributo es que será distribuido a travéz de todos sus componentes hijos.

  ``setProps():`` método que permite establecer las props globales en el arbol, esto con el propósito de poder inyectar props al momento de renderizar el arbol.

  ``render():`` método encardado de renderizar todo el árbol, este método es delicado porque es el encardado de ejecutar todas las operaciones asíncronas de los componentes del arbol, esto incluye los métodos _create()_ y _assemble_ de cada componente en sus nodos, este método establece el orden en el que se renderiza toda la vista, basado por supuesto en la estructura compleja que se fue estableciendo en la composición.

  ``assemble(), recurseAssemble():`` estos métodos trabajan en conjunto, y se encargan de complementar el renderizado de la vista que inicia el método _render()_. _assemble()_ se encarga de anidar cada componente hijo en su padre respetando todas las reglas mencionadas hasta ahora, debido a que la estructura anidada requiere de iteraciones cada vez más específicas, abstraemos el proceso con _recurseAssemble()_.

  ``remove():`` método encargado de remover el arbol de componentes del DOM, esto incluye el script de lógica.

#### __TreeLayoutComponent__
  Esta clase tiene exactamente las mismas funcionalidades que __TreeComponent__, esto debido a que extiende de ella, es una clase hija.
~~~typescript
class TreeLayoutComponent extends TreeComponent {
  //override method
  private assemble(): void;
  //override method
  private remove(): void;
}
~~~
  #### <u>estructura</u>
  La estructura es exactamente la misma que su clase padre con una diferencia: la hora de ensamblar y remover el árbol apunta a una raíz distinta ya que pertenece a la estructura Layout, por ello se ensambla en una raíz especifica previamente quedó manifiesta la diferencia entre ellas; por esta razón sobrescribimos el método _assemble()_ y el _remove()_.

#### __Pagination__
Esta clase es encargada de manipular el contenido de la etiqueta raíz de los TreeConponent. Ya que se trata del contenido principal de la página, le atribuí a esta clase el decoroso nombre de __paginación__ y su implementación se asemeja a un sistema de enrutamiento, pero por supuesta para nada sofisticado.
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
  //method
  jumpToTree(treeName: string): Promise<void>;
  //method
  comeHome(): Promise<void>;
  //method
  init(): Promise<void>
}
~~~
  #### <u>estructura</u>
``currentPage:`` hace referencia al árbol de componentes que está renderizado.

``home:`` nombre del arbol de componentes predeterminado como renderizado inicial.

``pages:`` componentes dispuestos a participar de la paginación, es decir, su renderización está a manos de esta clase, estos se estructuran con _clave_ y _valor_, donde la clave es el nombre del arbol y el valor es la ruta del fichero que lo contiene, este diseño sigue la técnica previamente mencionada de importar scripts por demanda.
  
``jumpToTree():`` método encargado de cambiar el árbol renderizado por otro que se le especifique.

``comeHome():`` método encargado de renderizar siempre el árbol de componentes predeterminado como inicial, desrenderizando cualquier otro que se encuentre renderizado en el momento.

### __Aspetos impotantes__
Entre algunos aspectos a resaltar están una serie de directorios que son requeridos para el funcionamiento de mi pequeño framework:
|Directorio|Ruta|Detalles|
|---|---|---|
|__src__|src/|Es la raíz la estructura del proyecto|
|__components__|src/components/|Encargado de alojar la declaracion de los componentes, el nombre de los archivos debe finalizar con: _".template.js"_.|
|__pages__|src/pages/|Encargado de alojar los árboles de componentes: _TreeComponent_, esto hace parte de la paginación, el nombre de los archivos deben finalizar con: _".page.js"_|
|__rules__|src/rules/|Encargado de alojar las reglas de cada componente, lel nombre de los archivos dee finalizar con: _".rule.js"_|


### __Rules__
la rules son las reglas que cada compoente puede declarar para su funcionalidad intrínseca, son en esencia funcionalidades a base de _eventListeners_, esta estructura converge con la implementación de los métodos del siclo de vida del componente: _didMount()_ y _didUnmount()_.

La estructura base de su implementación en un componente es la siguiente: 
~~~Javascript
  didMount = async ()=>{
    const { add } = HeaderRule(this);
    add();
  }
  
  didUnmount = async ()=>{
    const { remove } = HeaderRule(this);
    remove()
  }
~~~

### __Sintaxis__
Toda las declaraciones de clase que se ha expuesto hasta ahora están escritas con typescript solo con fines descriptivos, el presente proyecto originalmente solo utiliza javascript, en un futuro próximo planeo migrar esta lógica de forma más rigurosa a typescript.

La sintaxis que diseñé para maquetar el árbol de componentes está inspirada en los árboles de Widgets de __flutter__, aquí un pequeño ejemplo de un árbol de componentes en mi pequeño framework:

#### <u>Component</u>

~~~javascript
import { Component } from "my_framework";

export class PageComponent extends Component {
  name = 'page';
  template(){
    return super.template(`
    <section class="page">
      <div class="page__aside">
        <h2 class="page__aside__title">{title}</h2>
        <h3 class="page__aside__subtitle">{subtitle}</h3>
        <img draggable="false" class="page__aside__img" src="{img}" alt="picture">
        <div class="page__aside__info">
          <p class="page__aside__info__text">{rate}{stars}</p>
          <p class="page__aside__info__text">{genres}</p>
        </div>
      </div>
      <p class="page__info__text">{date}</p>
      <p class="page__description" >{description}</p>
      <div tabindex="-1" class="page__watch">
        <img 
          class="page__watch__img" 
          src="src/assets/play_btn.svg" 
          alt="play button"
        >
      </div>
    </section>
    `)
  }
}
~~~
Desde arriba hacia bajo se puede observar: la importación de la clase __Component__, en este caso no cuenta con hijos, pero estos pueden ser inyectados en cualquier momento con su mpetodo _setChildren()_, sin embargo, en la plantilla no hay declarada ningun raíz relativa ni tampoco una raíz volatil, este componente no tiene ni planea tener hijos.

Lo que sí se puede apreciar es la presencia de __props__, en concreto 8, ya que estas no se encuentran declaradas en el cuerpo de la clase, probablemente serán inyectadas de forma externa por el método constructor de forma externa.

Otro aspecto importante es la implementación del método _template()_ el cual está siendo sobre escrito y utilizado desde la propiedad __super__, este patrón permite ocultar mucha lógica de la implementación y a su véz distribuye las responsabilidades en __clase principlal__.

#### <u>Layout</u>
~~~Javascript
import { HeaderComponent } from "/components/layout/header/header.template.js";
import { NavComponent } from "/components/layout/header/nav.template.js";
import { SubnavComponent } from "/components/layout/header/subnav.template.js";
import { TreeLayoutComponent } from "my_framework";

export const Header = new TreeLayoutComponent({
  name: "header",
  children: [
    new HeaderComponent()
      .setChildren([
        new NavComponent(),//end component
        new SubnavComponent({
          props: {
            className: "subnav_movies",
            opction1: "Popular",
            opction2: "Mejores",
            opction3: "Próximamente",
          }
        }),//end component
          new SubnavComponent({
            props: {
              className: "subnav_shows",
              opction1: "Popular",
              opction2: "Mejores",
              opction3: "Al aire",
            }
          })//end component
        ])//end component
  ],
});//end tree
~~~
En este caso se puede apreciar desde arriba: Las importaciones de la clase _TreeLayoutComponet_ y los componentes del árbol. Este árbol cuenta con un hijo directo, en este caso un componente volatil que extiende de la clase __VolatileComponent__, el cual tiene dos hijos, recordando que la cantidad es totalmente arbitraria, fácilmente podrían ser 3 o 4, por último se aprecia como el Componente __SubNavComponent__ está inyectando props por el método _constructor_. declarar los hijos directamente en el atributo children no es una obligación, se puede tratar a conveniencia.

__TreeComponent__
~~~javascript
import { APIKEY } from 'privateGlobal.js';
import { MoviePropsPage } from '../adapter/moviePage.js';
import { PageComponent } from 'components/page/page.template.js';
import { TreeComponent } from 'my_framework';

const builder = async (component, treeProps)=>{
  const response = await fetch(`https://api.themoviedb.org/3/movie/${treeProps.id}?api_key=${APIKEY}&language=es-ES`);
  const movieDetail = await response.json()
  component.props = new MoviePropsPage(movieDetail).data
}

const Movie = new TreeComponent({
  name: 'movie',
  children: [
    new PageComponent({builder})
  ]
});

export default Movie;
~~~
En este caso particular se da uso del atributo __$builder__, este ejemplo muestra desde arriba: las importaciones necesarias de la clase TreeComponent, los componentes del árbol y algunos datos de interes para la consulta, posteriormente se declara una función __builder__ la cual hace referencia al atributo del componente, en este ejemplo podemos apreciar un uso prático para ese atributo, nos ayuda a establecer _props_ en el componente cuando provienen de un servicio externo _api Restful_.
Algo a resaltar es que el arbol está siendo exportado por __default__, esto es necesario en todo _TreeComponent_ que busque participar de la navegación, es decir, la clase __Pagination__ exige este tipo de declaración para funcionar.

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
En la sintaxis de _paginación_ podemos apreciar como el atributo ``pages`` contiene en la "key" el nombre de arbol de componentes y en su "value" la ruta, esta ruta tiene por supuesto que el directorio que los contiene es: __pages/__, y como se mencionó previamente, todos estos son árboles que están siendo exportados por default en sus respectivos scripts.