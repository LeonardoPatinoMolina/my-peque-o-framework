/**
 * @param {string} selector
 * @returns {HTMLElement}
 */
export const $ = (selector) => document.querySelector(selector);
/**
 * @param {string} selector
 * @returns {HTMLElement[]}
 */
export const $$ = (selector) => document.querySelectorAll(selector);

  /**
   * Transforma un texto plano en nodos html
   * @param {string} str
   * @returns {HTMLElement}
   */
  export const string2html = (str) => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    return doc.body.children[0];
  }