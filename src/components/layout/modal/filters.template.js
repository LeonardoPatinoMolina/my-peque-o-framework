import { Component } from "../../../lib/leoframe.js";
import { FiltersRules } from "../../../rules/filters.rule.js";

export class FiltersComponent extends Component {
  name = 'filters';
  props = {
    primary: {
      movies: "active",
      shows: "",
    },
    secondary: {
      popular: "active",
      rated: "",
      upcoming: "",
      onair: "",
    },
    movies: "flex",
    shows: "none"
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
    for(let [key, value] of Object.entries(this.props[args.type])){
      this.props[args.type][key] = ""
    }
    this.props[args.type][filterName] = "active";

    if(!args?.whait)super.update()
    return this;
  }

  /**
   * Método encargado de mostrar la lista de filtros
   * según corresponda
   * @param {string} filterName nombre de lista de filtros
   * @param {{whait?: boolean}} args determina si el componente debe actualizarse o esperar una próxima invocación
   * @returns {Component} componente princicpal
   */
  showFilters(filterName, args){
    this.props.movies = "none";
    this.props.shows = "none";

    this.props[filterName] = "flex";
    if(!args?.whait) super.update()
    return this;
  }
  
  didMount = async ()=> {
    FiltersRules(this).add();
  }
  didUnmount = async ()=> {
    FiltersRules(this).remove();
  }
  
  template() {
  return super.template(`
  <aside data-key="${this.key}" class="filters">
  <ul class="filters__list_filter">
    <li data-type="movies" class="filters__list_filter__item ${this.props.primary.movies}">Peliculas</li>
    <li data-type="shows" class="filters__list_filter__item ${this.props.primary.shows}">Series</li>
    <span tabindex="-1" class="filters__logo material-symbols-rounded">info</span>
  </ul>
  <ul style="display: ${this.props.movies};" class="filters__list_subfilter">
    <li data-tag="popular" class="filters__list_subfilter__item ${this.props.secondary.popular}">Populares</li>
    <li data-tag="rated" class="filters__list_subfilter__item ${this.props.secondary.rated}">Mejores</li>
    <li data-tag="upcoming" class="filters__list_subfilter__item ${this.props.secondary.upcoming}">Próximas</li>
  </ul>
  <ul style="display: ${this.props.shows};" class="filters__list_subfilter">
    <li data-tag="popular" class="filters__list_subfilter__item ${this.props.secondary.popular}">Populares</li>
    <li data-tag="rated" class="filters__list_subfilter__item ${this.props.secondary.rated}">Mejores</li>
    <li data-tag="onair" class="filters__list_subfilter__item ${this.props.secondary.onair}">Al aire</li>
  </ul>
</aside>
  `) 
  }
}