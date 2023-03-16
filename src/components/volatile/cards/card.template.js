const cardvolatileTemplate = `
<div 
  id="{id}" 
  class="cardvolatile"
  onclick="window.dispatchEvent(new CustomEvent('cardclick', { detail: this}))"
  data-filter="popular"
  data-type="movie"
>
  <h3 class="cardvolatile__title">{title}</h3>
  <p class="cardvolatile__subtitle">{body}</p>
</div>
`;

export default cardvolatileTemplate;