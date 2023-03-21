import { Component } from "../../../lib/leoframe.js";
import { FiltersRules } from "../../../rules/filters.rule.js";

export class FiltersComponent extends Component {
  name = 'filters';
  props = {
    primary: "movies",
    secondary: "popular",
    }

  /**
   * Método encargado de marcar como activo el filtro 
   * que corresponda
   * @param {string} filterName nombre de filtro
   * @param {{type: string, whait?: boolean}} args detalles sobre método, 
   * whait: determina si el componente debe actualizarse o esperar una próxima invocación
   * type: determina si el filtro a marcar es primario o secundario
   * @returns {Component} componente princicpal
   */
  filterActivate(filterName, args){
    this.props[args.type] = filterName;

    if(!args?.whait)super.update()
    return this;
  }
  
  didMount = async ()=> {
    FiltersRules(this).add();
    const logo = this.body.querySelector('.filters__logo')
    let timer;
    logo.addEventListener('focus',()=>{
      clearTimeout(timer);
      timer = setTimeout(()=>{ logo.blur() }, 3000)
    })
  }
  didUnmount = async ()=> {
    FiltersRules(this).remove();
    let timer;
    const logo = this.body.querySelector('.filters__logo')
    logo.removeEventListener('focus',()=>{
      clearTimeout(timer);
      timer = setTimeout(()=>{ logo.blur() }, 3000)
    })
  }
  
  template() {
    const P = this.props;

    return super.template(`
  <aside data-key="${this.key}" class="filters">
  <ul class="filters__list_filter">
    <li data-type="movies" class="filters__list_filter__item ${P.primary === "movies" && "active"}">Peliculas</li>
    <li data-type="shows" class="filters__list_filter__item ${P.primary === "shows" && "active"}">Series</li>
    <span tabindex="-1" class="filters__logo material-symbols-rounded">info</span>
  </ul>
  <ul style="display: ${P.primary === "movies" ? "flex" : "none"};" class="filters__list_subfilter">
    <li data-tag="popular" class="filters__list_subfilter__item ${P.secondary === "popular" && "active"}">Populares</li>
    <li data-tag="rated" class="filters__list_subfilter__item ${P.secondary === "rated" && "active"}">Mejores</li>
    <li data-tag="upcoming" class="filters__list_subfilter__item ${P.secondary === "upcoming" && "active"}">Próximas</li>
  </ul>
  <ul style="display: ${P.primary === "shows" ? "flex" : "none"};" class="filters__list_subfilter">
    <li data-tag="popular" class="filters__list_subfilter__item ${P.secondary === "popular" && "active"}">Populares</li>
    <li data-tag="rated" class="filters__list_subfilter__item ${P.secondary === "rated" && "active"}">Mejores</li>
    <li data-tag="onair" class="filters__list_subfilter__item ${P.secondary === "onair" && "active"}">Al aire</li>
  </ul>
</aside>
  `) 
  }
}