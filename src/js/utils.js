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