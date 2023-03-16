const modalTemplate = `
<section class="modal_wrapper">
  <div class="modal">
    <div class="modal__header">
      <div class="root0"></div>
    </div>
    <aside class="modal__aside">
      <ul class="modal__aside__list_filter">
        <li class="modal__aside__list_filter__item active">Peliculas</li>
        <li class="modal__aside__list_filter__item">Series</li>
        <span class="modal__aside__logo material-symbols-rounded">info</span>
      </ul>
      <ul class="modal__aside__list_subfilter">
        <li class="modal__aside__list_subfilter__item active">Populares</li>
        <li class="modal__aside__list_subfilter__item">Mejores</li>
        <li class="modal__aside__list_subfilter__item">Próximas</li>
      </ul>
      <ul style="display: none;" class="modal__aside__list_subfilter">
        <li class="modal__aside__list_subfilter__item">Populares</li>
        <li class="modal__aside__list_subfilter__item">Mejores</li>
        <li class="modal__aside__list_subfilter__item">Al aire</li>
      </ul>
    </aside>
    <div class="modal_body">
      <div class="root1"></div>
    </div>
  </div>
</section>
`;

export default modalTemplate;
