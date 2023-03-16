"use strict";
import { $, string2html } from "./utils.js";

/**
 * Clase de declaración de componente
 */
export class Component {
  name;
  children = [];
  body;
  templatePath;
  props;
  builder;

  /**
   * @param {{name: string, templatePath: string, builder: boolean, props: {[string]: any}, children: [] | VolatileComponent, builder: (component: Component, treeProps: {[string]: any})=>Promise<void>}} args
   */
  constructor({ 
    name, 
    templatePath, 
    props = false, 
    children = [], 
    builder = false,
  }) {
    this.name = name;
    this.templatePath = templatePath;
    this.props = props;
    this.children = children;
    this.builder = builder;
  }

  create = async (externProps) => {
    //en caso de tener una creación programada de hijos en el método kinship, ejecutarla injectandole los 
    //props del árbol
    if(this.builder) {
      await this.builder(this, externProps);
    };
    
    //importamos el script correspondiente y lo alamenarmos en una variable
    const moduleTemplate = await import(`../${this.templatePath}${this.name}.template.js`)
    let textComponent = moduleTemplate.default;
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

    //procedemos a inyectar las props
    if(myProps){
      for (const [key, value] of Object.entries(myProps)){
        const regex = new RegExp(`{${key}}`, "g");
        textComponent = textComponent.replace(regex,`${value}`)
      }//end for
    }
    //convertimos el template a un nodo del DOM
    const componentNode = string2html(textComponent);
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
    const nextTree = await import(`../pages/${this.pages[treeName]}`)

    $('#placeholder').classList.add('flex-align')
    this.currentPage.remove();
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
    const homeModule = await import(`../pages/${this.pages[this.home]}`)
    homeModule.default.render();
    this.currentPage = homeModule.default
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
   * @param {{name: string, children: Component[], rulesScript: HTMLElement, globalProps: {[string]: any}}} param0
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
    // for (let i = 0; i < epa.length; i++) {
      const toReplace = body.querySelector(`.root${i}`);
      toReplace.replaceWith(child.body)
  
      if (child.children.length > 0){
        this.recurseAssemble(child);
      }
      i++;
    } //end for
  }

  remove(){
    $('#root').innerHTML = ""
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
  remove(){
    // $('#root').innerHTML = ""
    $(`#${this.name}`).innerHTML = ""

  }
}

export class VolatileComponent extends Component{
    
  //@override method
  create = async (externProps)=>{
     //en caso de tener una creación programada de hijos en el método kinship, ejecutarla injectandole los 
    //props del árbol
    if(this.builder) {
      await this.builder(this, externProps);
    };

    //importamos el script correspondiente y lo alamenarmos en una variable
    const moduleTemplate = await import(`../${this.templatePath}${this.name}.template.js`)
    let textComponent = moduleTemplate.default;
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

    //procedemos a inyectar las props
    if(myProps){
      for (const [key, value] of Object.entries(myProps)){
        const regex = new RegExp(`{${key}}`, "g");
        textComponent = textComponent.replace(regex,`${value}`)
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
      textComponent = textComponent.replace(regex, root);
    }
    //NEW end --------------------------------------
    //convertimos el template a un nodo del DOM
    const componentNode = string2html(textComponent);
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
