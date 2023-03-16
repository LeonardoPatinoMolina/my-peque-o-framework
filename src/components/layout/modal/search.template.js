export const searchTemplate = `
<div class="search">
  <input
  placeholder="search" 
  class="search__input_text"
  type="search" 
  autocomplete="off"
  {disabled}
  oninput="window.dispatchEvent(new CustomEvent('searching', { detail: this}))"
  >
  <span 
  onclick="window.dispatchEvent(new CustomEvent('modalclose', { detail: this}))"
  class="btn_modal search__logo material-symbols-rounded"
  >
  {logo}
</span>
</div>
`;

export default searchTemplate;