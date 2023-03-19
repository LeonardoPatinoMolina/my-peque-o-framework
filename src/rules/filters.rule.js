import { Component, Rule } from "../lib/leoframe.js";
import { FiltersComponent0 } from "../pages/layout/modal/Modal.js";

/**
 * 
 * @param {Component} component 
 * @returns {Rule}
 */
export const FiltersRules = (component)=>{
  
  const addPrimaryFilterListener = ()=>{
    const filterItems = component.body.querySelectorAll('.filters__list_filter__item');
    
    filterItems.forEach(item=>{
      item.addEventListener('click', handleItemFilterClick);
    })
  }
  
  const addSecondaryFilterListener = () => {
    const subFilterItems = component.body.querySelectorAll('.filters__list_subfilter__item');
    
    subFilterItems.forEach(item=>{
      item.addEventListener('click', handleItemSubFilterClick);
    })
  }
  
  //remove
  const removePrimaryFilterListener = ()=>{
    const filterItems = component.body.querySelectorAll('.filters__list_filter__item');

    filterItems.forEach(item=>{
      item.removeEventListener('click', handleItemFilterClick);
    })
  }

  const removeSecondaryFilterListener = () => {
    const subFilterItems = component.body.querySelectorAll('.filters__list_subfilter__item');
    
    subFilterItems.forEach(item=>{
      console.log(0);
      item.removeEventListener('click',handleItemSubFilterClick);
    })
  }

  return new Rule({
    adders: [addPrimaryFilterListener, addSecondaryFilterListener],
    removers: [removePrimaryFilterListener, removeSecondaryFilterListener]
  });
}

//Utils-----------------------------------------------
function handleItemFilterClick({currentTarget}){
  const { type } = currentTarget.dataset;
  //actualizamos el componente Filters para mostrar
  //menú de filtro según corresponda el click
  FiltersComponent0
  .showFilters(type, {whait: true})
  .filterActivate(type, {type: 'primary'});
}

function handleItemSubFilterClick({currentTarget}, items){
  const { tag } = currentTarget.dataset;
  //actualizamos el componente Filters para mostrar
  //seleccionar el filtro según correponda el clcik
  FiltersComponent0
    .filterActivate(tag, {type: 'secondary'});
}
