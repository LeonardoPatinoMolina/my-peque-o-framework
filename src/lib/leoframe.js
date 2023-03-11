"use strict";
import { $ } from "./utils.js";

/**
 * Clase de declaración de componente
 */
export class Component {
  path;
  name;
  children = [];
  body;
  rootNumber;

  /**
   * @param {name: string, path: string, rootNumber: number | boolean} args
   */
  constructor({ name, path, rootNumber }) {
    this.name = name;
    this.path = path;
    this.rootNumber = rootNumber;
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

  create = async () => {
    return new Promise((resolve, reject) => {
      const reader = new XMLHttpRequest();
      reader.open("GET", `${this.path}${this.name}.html`, true);
      reader.send();
      reader.onreadystatechange = async () => {
        if (reader.readyState === 4 && reader.status === 200) {
          const componentNode = this.string2html(reader.responseText);
          this.body = componentNode;
          if (this.children.length === 0) resolve(componentNode);
          const childrenPromises = this.children.map((element) =>
            element.create()
          );
          await Promise.all(childrenPromises);
          resolve(componentNode);
        }
        if (reader.readyState === 4 && reader.status !== 200) {
          reject(`incorrecto - ${this.name}`);
        }
      };
    });
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
  /**
   *
   * @param {{name: string, children: HTMLElement[], treeType: string}} param0
   */
  constructor({name, children, treeType }) {
    this.name = name;
    this.componentsNodes.push(...children);
    this.treeType = treeType;
  }

  render = async () => {
    const createdComp = this.componentsNodes.map(async (element) =>
      element.create()
    );
    const childrenNodes = await Promise.all(createdComp);
    this.assemble();
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
    $('#root').innerHTML = ""
  }
}


export class Pagination {
  currentPage;
  home;
  pages = [];

  /**
   * 
   * @param {{home: TreeComponent, pages: TreeComponent[]}} param0 
   */
  constructor({home, pages}){
    this.pages = [home, ...pages];
    this.home = home;
    this.currentPage = home;
  }
  /**
   * 
   * @param {string} treeName 
   */
  jumpToTree(treeName){
    if(this.currentPage.name === treeName) return;
    const newPage = this.pages.filter(page=>page.name === treeName)[0];
    $('#placeholder').classList.add('flex-align')
    this.currentPage.remove()
    newPage.render().then(()=>{
      $('#placeholder').classList.remove('flex-align')
    });
    this.currentPage = newPage;
  }
  comeHome(){
    if(this.currentPage.name === 'home') return;
    $('#placeholder').classList.add('flex-align')
    this.currentPage.remove();
    this.home.render().then(()=>{
      $('#placeholder').classList.remove('flex-align')
    });
    this.currentPage = this.home;
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