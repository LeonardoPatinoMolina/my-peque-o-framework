"use strict";
import { $ } from "./utils.js";

/**
 * Clase de declaración de componente
 */
export class Component {
  name;
  children = [];
  body;
  rootNumber;
  templatePath;
  props;

  /**
   * @param {name: string, rootNumber: number | boolean, templatePath: string} args
   */
  constructor({ name, rootNumber, props = false, templatePath }) {
    this.name = name;
    this.rootNumber = rootNumber;
    this.props = props;
    this.templatePath = templatePath;
  }

  /**
   *
   * @param {{parent: HTMLElement | boolean, childBuilder: (component: Component
   * )=> void}} args
   * @returns {HTMLElement | void}
   */
  build = ({ parent = false, childBuilder }) => {
    if (parent) {
      parent.children.push(this);
    } else {
      if (childBuilder) {
        childBuilder(this);
      }
      return this;
    }
  };

  create = async (externProps) => {
    //importamos el script correspondiente
    const moduleTemplate = await import(`../${this.templatePath}${this.name}.template.js`)
    let textComponent = moduleTemplate.default;

    /**
     * verificamos si hay props globales o
     * locales y las fucionamos, las reglas del framework 
     * indican no puedenh aber props con key repetidas en
     * todo el arbol.
     */
    let myProps = false;
    if(externProps && this.props) myProps = {
      ...externProps,
      ...this.props
    };
    else if(externProps) myProps = { ...externProps}
    else if(this.props) myProps = { ...this.props }
    if(myProps){
      for (const [key, value] of Object.entries(myProps)){
        const regex = new RegExp(`{${key}}`, "g");
        textComponent = textComponent.replace(regex,`${value}`)
      }//end for
    }

    //convertimos el template a un nodo del DOM
    const componentNode = this.string2html(textComponent);
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
  };
  /**
   * Transforma un texto plano en nodos html
   * @param {string} str
   * @returns {HTMLElement}
   */
  string2html(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body.children[0];
  }
}

export class TreeComponent {
  componentsNodes = [];
  root = new DocumentFragment();
  name;
  rulesScript;
  globalProps;
  /**
   *
   * @param {{name: string, children: HTMLElement[], rulesScript: HTMLElement, props: {[string]: any}}} param0
   */
  constructor({name, children, rulesScript, globalProps = false }) {
    this.name = name;
    this.componentsNodes.push(...children);
    this.rulesScript = rulesScript;
    this.globalProps = globalProps;
  }

  setProps(props){
    this.globalProps = props;
    return this;
  }

  render = async () => {
    const createdComp = this.componentsNodes.map(async (element) =>
      element.create(this.globalProps)
    );
    const childrenNodes = await Promise.all(createdComp);
    this.assemble();
    if(this.rulesScript) {
      document.head.appendChild(this.rulesScript);
    };
  };

  assemble() {
    this.componentsNodes.forEach((component) => {
      if (component.children.length === 0) {
        this.root.appendChild(component.body);
      }else{
        this.recurseAssemble(component.body, component);
      }

      if(this.treeType === 'footer' || this.treeType === 'header'){
        document.body.replaceChild(this.root, $(`#${this.treeType}`));
      }else{
        $('#root').appendChild(this.root)
      }
    });
  }
  /**
   *
   * @param {HTMLElement} parent
   * @param {Component} component
   */
  recurseAssemble(parent, component) {
    for (const child of component.children) {
      parent.replaceChild(
        child.body, 
        parent.querySelector(`.root${child.rootNumber}`)
      );
      if (child.children.length > 0){
        this.recurseAssemble(child.body, child);
      }
    } //end for
    this.root.appendChild(parent);
  }

  remove(){
    if(this.rulesScript) document.head.removeChild(this.rulesScript);
    $('#root').innerHTML = ""
  }
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

export class TreeLayoutComponent extends TreeComponent {
  
  //@override method
  assemble() {
    this.componentsNodes.forEach((component) => {
      if (component.children.length === 0) {
        this.root.appendChild(component.body);
      }else{
        this.recurseAssemble(component.body, component);
      }
      document.body.replaceChild(this.root, $(`#${this.name}`));
    });
  }
}