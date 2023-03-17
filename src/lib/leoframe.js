"use strict";
import { $, string2html } from "./utils.js";

/**
 * Clase de declaración de componente
 */
export class Component {
  name = 'componente';
  template = '<div>Hola mundo</div>';
  body;
  children = [];
  props;
  $builder;
  
  /**
   * @param {Component[]} children
   * @param {(component: Component, treeProps: {[string]: any})=>Promise<void>} builder
  */
 constructor(children = [], builder = false) {
   this.children = children;
   this.$builder = builder;
  }
  
  /**
   * Método especializado se jecuta al renderizar el componente
   */
  didMount = async ()=>{
    console.log('component ready');
  };

  /**
   * Método especializado se ejecuta al des-renderizar el componente
   */
  didUnmount = async ()=>{
    console.log('component out');
  };
  /**
   * 
   * @param {{[string]:any}} props
   * @returns {Component}
   */
  setProps(props){
    this.props = props;
    return this;
  }
  
  /**
   * 
   * @param {Component[]} children
   * @returns {Component}
   */
  setChildren(children){
    this.children = children;
    return this;
  }

  /**
   * 
   * @param {{[string]:any}} externProps
   * @returns {Promise<void>}
   */
  create = async (externProps) => {
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
    let myProps = false;
    if(externProps && this.props) myProps = {
      ...externProps,
      ...this.props
    };
    else if(externProps) myProps = { ...externProps}
    else if(this.props) myProps = { ...this.props }

    let templatetext = this.template;
    //procedemos a inyectar las props
    if(myProps){
      for (const [key, value] of Object.entries(myProps)){
        const regex = new RegExp(`{${key}}`, "g");
        templatetext = templatetext.replace(regex,`${value}`)
      }//end for
    }
    //convertimos el template a un nodo del DOM
    const componentNode = string2html(templatetext);
    this.body = componentNode;

    //
    /**
     * creamos de forma recursiva los hijo e inyectamos las props 
     * hacia dentro del arbol, es importante saber que las props de arbol deben navegar por todos los componentes, sea esta un false o datos válidos
     */
    if (this.children.length > 0){
      const childrenPromises = this.children.map(async (element) =>
        element.create(myProps)
      );
      const responsePromise = await Promise.all(childrenPromises);
    }
  };//end method

  //actualiza el compoente
  update = async ({newProps}) =>{
    await this.create(newProps);

    const fragment = new DocumentFragment();
    this.children.forEach((child) => {
      if (child.children.length === 0) {
        fragment.appendChild(child.body);
      }else{
        this.recurseAssemble(child);
        fragment.appendChild(child.body);
      }
    });
    $(`.${this.body.classList[0]}`).innerHTML = '';
    $(`.${this.body.classList[0]}`).appendChild(fragment);
    // this.body.appendChild(fragment)
  }//end method

}

export class Pagination {
  currentPage;
  home;
  pages;
  /**
   * 
   * @param {{home: string, pages: string[]}} param0 
   */
  constructor({home, pages}){
    this.pages = pages;
    this.home = home;
  }
  /**
   * Encargada de renderizar el arbol que se le indique siempre
   * y cuando se ncuentre en paginacion
   * @param {string} treeName 
   * @param {boolean | {[string]: any}} props 
   * @returns {Promise<void>}
   */
  async jumpToTree(treeName, props = false){
    if(this.currentPage.name === treeName) return;
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
  name;
  rulesScript;
  globalProps;
  children = [];
  root = new DocumentFragment();

  /**
   *
   * @param {{name: string, children: Component[], rulesScript: HTMLElement, globalProps: {[string]: any}}} args
   */
  constructor({name, children, rulesScript, globalProps = false }) {
    this.name = name;
    this.children = children;
    this.rulesScript = rulesScript;
    this.globalProps = globalProps;
  }

  setProps(props){
    this.globalProps = props;
    return this;
  }

  render = async () => {
    //cremos tdps los componentes del arbol
    const createdComp = this.children.map(async (element) =>
      element.create(this.globalProps)
    );
    const childrenNodes = await Promise.all(createdComp);
    //ensamblamos el fragment 
    this.assemble();
    //añadimos es script de reglas si existe
    if(this.rulesScript) {
      document.head.appendChild(this.rulesScript);
    };
    
    //ejecutamos el método didMount de los componentes hijos
    const recursiveMount = async (components)=>{
      for(const component of components){
        if(component.children.length > 0){
          await recursiveMount(component.children);
        }
        await component.$didMount();
      }
    }
    if(this.children.length > 0){
      window.setTimeout(()=>{
        recursiveMount(this.children);
      },500)
    }
  };

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
   *
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

  remove = () => {
    
    //ejecutamos el método didUnmount de cada component
    const recursiveUnmount = async (components)=>{
      for(const component of components){
        if(component.children.length > 0){
          await recursiveUnmount(component.children);
        }
        await component.$didUnmount();
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
  remove = () => {
    //ejecutamos el método didUnmount de cada component
    const recursiveUnmount = async (components)=>{
      for(const component of components){
        if(component.children.length > 0){
          await recursiveUnmount(component.children);
        }
        await component.$didUnmount();
      }
    }
    if(this.children.length > 0){
      recursiveUnmount(this.children);
    }
    // $(`#${this.name}`)
    document.getElementById(`${this.name}`).innerHTML = ""
  }
}

export class VolatileComponent extends Component{
    
  //@override method
  create = async (externProps)=>{
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
    let myProps = false;
    if(externProps && this.props) myProps = {
      ...externProps,
      ...this.props
    };
    else if(externProps) myProps = { ...externProps}
    else if(this.props) myProps = { ...this.props }

    let templatetext = this.template;
    //procedemos a inyectar las props
    if(myProps){
      for (const [key, value] of Object.entries(myProps)){
        const regex = new RegExp(`{${key}}`, "g");
        templatetext = templatetext.replace(regex,`${value}`)
      }//end for
    }

    //NEW begin --------------------------------------
    //injectamos las raices de los hijos
    if(this.children.length > 0){
      let root = '';
      for (let i = 0; i < this.children.length; i++){
        root += `<div class="root${i}"></div>`
      }//end for
      const regex = /\[volatile\]/g
      templatetext = templatetext.replace(regex, root);
    }
    //NEW end --------------------------------------
    //convertimos el template a un nodo del DOM
    const componentNode = string2html(templatetext);
    this.body = componentNode;

    //
    /**
     * creamos de forma recursiva los hijo e inyectamos las props 
     * hacia dentro del arbol, es importante saber que las props de arbol deben navegar por todos los componentes, sea esta un false o datos válidos
     */
    if (this.children.length > 0){
      const childrenPromises = this.children.map(async (element) =>
        element.create(myProps)
      );
      const responsePromise = await Promise.all(childrenPromises);
    }
  }

}
