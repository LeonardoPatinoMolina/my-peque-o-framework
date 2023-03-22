"use strict";
import { $, string2html } from "./utils.js";

/**
 * Clase de declaración de componente
 */
export class Component {
  /** Nombre principal del componente
   * @type {string}
   */
  name = 'componente';
  
  /** LLave unica que identifica el componente en caso
   * tal que este  mutable
   * @type {string}
   */
  key;
  
  /** Nodo al que corresponde el presente componente
   * @type {HTMLElement}
   */
  body;

  /** Componentes hijos
   * @type {Component[] | VolatileComponent[]}
   */
  children = [];

  /** Propiedades de componente, estas estarán disponibles para todos
   *  sus hijos y posteriores
   * @type {{[string]: any}}
   */
  props = {};

  /**
   * @type {(component: Component, treeProps: {[string]:any})=>Promise<void>}
   */
  $builder;
  
  /**
   * @param {{key: string | number,children: Component[], builder: (component: Component, treeProps: {[string]: any})=>Promise<void>, props: {[string]:any}}} args
  */
 constructor(args) {
    this.key = args?.key;
    this.children = args?.children ?? [];
    this.props = args?.props ?? {};
    this.$builder = args?.builder;
  }
  
  /**
   * Método especializado se jecuta al renderizar el componente
   */
  async didMount(){
    if(this.children.length > 0){
      for (const child of this.children) {
        child.didMount();
      }
    }
  };
  
  /**
   * Método especializado se ejecuta al des-renderizar el componente
  */
 async didUnmount(){
   if(this.children.length > 0){
     for (const child of this.children) {
       child.didUnmount();
     }
    }
  };

  /**
   * Ensambla la la plantilla literal inyectando cada prop 
   * y estableciendo cada raíz
   * @param {string} template 
   * @returns {string} plantilla de componente
   */
  template(template){
    let templatetext = template.toString();

    //inyectamos las raices
    if(this.children.length > 0){
      for (let i = 0; i < this.children.length; i++){
        templatetext = templatetext.replace(`[child${i}]`,`<div class="root${i}"></div>`)
      }//end for
    }
    return templatetext;
    
  };//end method

  /**
   * Método encargado de asignar los componentes hijos
   * @param {Component[]} children
   * @returns {Component}
   */
  setChildren(children){
    this.children = children;
    return this;
  }

  /**
   * Encargada de construir el componente generando el 
   * nodo HTML, estableciendo las props, y a cada uno de los posibles hijos
   * @param {{[string]:any}} externProps
   * @returns {Promise<void>}
   */
  async create(externProps) {
    //en caso de tener una creación programada de hijos en el método kinship, ejecutarla injectandole los 
    //props del árbol
    if(this.$builder) {
      await this.$builder(this, externProps);
    };
    
    /**
     * verificamos si hay props globales o
     * locales y las fucionamos, las reglas del framework 
     * indican no puedenh haber props con key repetidas en
     * todo el arbol.
     */
    if(externProps) this.props = {
      ...this.props,
      ...externProps
    };
    //convertimos el template a un nodo del DOM
    const componentNode = string2html(this.template());
    this.body = componentNode;

    /**
     * creamos de forma recursiva los hijo e inyectamos las props 
     * hacia dentro del arbol, es importante saber que las props de arbol deben navegar por todos los componentes, sea esta un false o datos válidos
     */
    if (this.children.length > 0){
      const childrenPromises = this.children.map(async (element) =>
        element.create(this.props)
      );
      const responsePromise = await Promise.all(childrenPromises);
    }
  };//end method

  /**
   * Método encargado de actualizar un componente que lo requiera,
   * es decir, un componente mutable
   * @param {newProps: boolean | {[string]:any}} newProps 
   */
  async update(newProps = false) {
    //avisamos que el componente ha sido desmontado y esperamos a que el método termine.
    await this.didUnmount();
    if(newProps){
      await this.create({...this.props, ...newProps});
    }else{
      await this.create(this.props);
    }
    
    const fragment = new DocumentFragment();
    if(this.children.length > 0){
      this.children.forEach((child) => {
        if (child.children.length === 0) {
          fragment.appendChild(child.body);
        }else{
          this.recurseAssemble(child);
          fragment.appendChild(child.body);
        }
      });
      $(`[data-key="${this.body.dataset.key}"]`).innerHTML = '';
      $(`[data-key="${this.body.dataset.key}"]`).appendChild(fragment);
    }
    else{
      $(`[data-key="${this.body.dataset.key}"]`).replaceWith(this.body)
    }
    //avisamos que el componente ha sido montado, en este caso no es relevante esperar su ejecución completa
    this.didMount();

  }//end method

}

export class Pagination {
  /** Árbol establecido como el actualmente renderizado
   * @type {TreeComponent}
   */
  currentPage;

  /** Ábol establecido para ser renderizado en el inicio
   * @type {TreeComponent}
   */
  home;

  /** Objeto encargado de enlistar los árboles de componentes 
   * prestos a la paginación básica
   * @type {{[string]:any}}
   */
  pages;
  /**
   * @param {{home: string, pages: {[string]:any}}} args 
   */
  constructor(args){
    this.pages = args.pages;
    this.home = args.home;
  }
  /**
   * Encargada de renderizar el arbol que se le indique siempre
   * y cuando se ncuentre en paginacion
   * @param {string} treeName 
   * @param {boolean | {[string]: any}} props 
   * @returns {Promise<void>}
   */
  async jumpToTree(treeName, props = false){
    if(this.currentPage.name === treeName && !props) return;
    //mostramos el placeholder mientras cargamos la nueva página
    $('#placeholder').classList.add('flex-align')
    this.currentPage.remove();

    const nextTree = await import(`../pages/${this.pages[treeName]}`)

    if(props){
      await nextTree.default
        .setProps(props)
        .render()
    }else{
      await nextTree.default.render()
    }
    $('#placeholder').classList.remove('flex-align')
    this.currentPage = nextTree.default;
  }
  /**
   * Encargada de renderizar el componente home
   * @returns {Promise<void>}
   */
  async comeHome(){
    if(this.currentPage.name === 'home') return;
    $('#placeholder').classList.add('flex-align')
    this.currentPage.remove();
    const homeTree = await import(`../pages/${this.pages[this.home]}`)
    await homeTree.default.render();
    
    $('#placeholder').classList.remove('flex-align')
    this.currentPage = homeTree.default;
  }

  /**
   * Encargada de renderizar el arbol de componentes establecido como home
   */
  async init (){
    $('#placeholder').classList.add('flex-align')

    const homeModule = await import(`../pages/${this.pages[this.home]}`)
    homeModule.default.render();
    this.currentPage = homeModule.default
    $('#placeholder').classList.remove('flex-align')

  }
}

export class TreeComponent {
  /** Nombre principal del árbol de componentes
   * @type {string}
   */
  name;

  /** Props globales del árbol de componentes, estas
   * estarán disponibles n todos los compentes hijos
   * @type {{[string]:any}}
   */
  globalProps;

  /** Componentes hijos del árbol
   * @type {Component[]}}
   */
  children;

  /** Raiz principal que contendrá cada nodo correspondiente al árbol
   * @type {DocumentFragment}}
   */
  root;

  /**
   * @param {{name: string, children: Component[], globalProps?: {[string]: any}}} args
   */
  constructor(args) {
    this.name = args.name;
    this.children = args?.children ?? [];
    this.globalProps = args?.globalProps ?? {};
    this.root = new DocumentFragment();
  }

  /**
   * Método encargado de añadir hijos al árbol una vez que sea instanciado
   * @param {{[string]:any}} props 
   * @returns {TreeComponent}
   */
  setProps(props){
    this.globalProps = {...this.globalProps, ...props};
    return this;
  }

  /**
   * Método encargado de renderizars, es decir, añadir los
   * nodos del árbol al DOM
   * @returns {Promise<void>}
   */
  async render() {
    //cremos tdps los componentes del arbol
    const createdComp = this.children.map(async (element) =>
    element.create(this.globalProps)
    );
    const childrenNodes = await Promise.all(createdComp);
    //ensamblamos el fragment 
    this.assemble();
    
    //ejecutamos el método didMount de los componentes hijos
    const recursiveMount = async (components)=>{
      for(const component of components){
        if(component.children.length > 0){
          await recursiveMount(component.children);
        }
        await component.didMount();
      }
    }
    if(this.children.length > 0){
      window.setTimeout(()=>{
        recursiveMount(this.children);
      },100)
    }
  };

  /**
   * Método encargado de coplar cada nodo de los componente hijo a la raíz 
   * prncipal
   */
  assemble() {
    this.children.forEach((component) => {
      if (component.children.length === 0) {
        this.root.appendChild(component.body);
      }else{
        this.recurseAssemble(component);
        this.root.appendChild(component.body);
      }
      $('#root').appendChild(this.root)
    });
  }
  /**
   * Ensambla cada componente hijo en su respectivo nodo del
   * DOM de forma recursiva
   * @param {Component} component
   */
  recurseAssemble(component) {
    const {children, body} = component;
    let i = 0;
    for (const child of children) {
      const toReplace = body.querySelector(`.root${i}`);
      toReplace.replaceWith(child.body)
  
      if (child.children.length > 0){
        this.recurseAssemble(child);
      }
      i++;
    } //end for
  }

  /**
   * Desmonta el arból y avida a cada componente hijo
   */
  remove() {
    //ejecutamos el método didUnmount de cada component
    const recursiveUnmount = async (components)=>{
      for(const component of components){
        if(component.children.length > 0){
          await recursiveUnmount(component.children);
        }
        await component.didUnmount();
      }
    }
    if(this.children.length > 0){
      recursiveUnmount(this.children);
    }
    $('#root').innerHTML = "";
  }
}

export class TreeLayoutComponent extends TreeComponent {
  
  //@override method
  assemble() {
    this.children.forEach((component) => {
      if (component.children.length === 0) {
        this.root.appendChild(component.body);
      }else{
        this.recurseAssemble(component);
        this.root.appendChild(component.body);
      }
      $(`#${this.name}`).appendChild(this.root)
    });
  }//end mehtod
  
  //@override method
  remove() {
    //ejecutamos el método didUnmount de cada component
    const recursiveUnmount = async (components)=>{
      for(const component of components){
        if(component.children.length > 0){
          await recursiveUnmount(component.children);
        }
        await component.didUnmount();
      }
    }
    if(this.children.length > 0){
      recursiveUnmount(this.children);
    }
    $(`#${this.name}`).innerHTML = "";
    // document.getElementById(`${this.name}`).innerHTML = ""
  }
}

export class VolatileComponent extends Component{
    
  //override method
  template(template){
    let templatetext = template.toString();

   //NEW begin --------------------------------------
   //inyectamos las raices de los hijos
   const regex = /\[volatile\]/g
   if(this.children.length > 0){
     let root = '';
     for (let i = 0; i < this.children.length; i++){
       root += `<div class="root${i}"></div>`
      }//end for
      templatetext = templatetext.replace(regex, root);
    }
    //si no hay hijos, removemos la declaracion de la raiz
    else if(templatetext.indexOf('[volatile]')){
     templatetext = templatetext.replace(regex, '');
   }
   //NEW end --------------------------------------
   return templatetext;
  }
}

/**
 * clase encargada de 
 */
export class Rule {
  /**
   * Funciones encargadas de añadir nuevas reglas
   * @type {Array<()=>void>}
  */
  adders;
  
  /**
   * Funciones encargadas de remover las reglas en vigor
   * @type {Array<()=>void>}
   */
  removers;
  /**
   * @param {{adders: Array<()=>void>, removers: Array<()=>void>}} args 
   */
  constructor(args){
    this.adders = args?.adders;
    this.removers = args?.removers;
  }
  
  /**
   * Ejecuta uno a uno cada regla addEventListener
   * @returns {Rule}
  */
 add(){
   this.adders.forEach(add=>{ add() });
   return this;
  }
  
  /**
   * Ejecuta uno a uno cada regla removeEventListener
   * @returns {Rule}
  */
 remove(){
   this.removers.forEach(remove=>{ remove() })
   return this;
  }
}