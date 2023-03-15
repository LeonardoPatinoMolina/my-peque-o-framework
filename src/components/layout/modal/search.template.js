export const searchTemplate = `
<div class="search">
  <input
  placeholder="search" 
  class="search__input_text"
  type="text" 
  autocomplete="off"
  {disabled}
  >
  <span data-trigger="{trigger}" class="btn_modal search__logo material-symbols-rounded">
    {logo}
  </span>
  <div class="root0"></div>
</div>
`;

export default searchTemplate;