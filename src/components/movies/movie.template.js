export const template = `
<article class="movie">
  <img class="movie__img" src="{img}" alt="movie picture">
  <h2 class="movie__title">{title}</h2>
  <h4 class="movie__subtitle">{original_title}</h3>
  <div class="movie__description_wrapper">
    <p class="movie__description" tabindex="-1"><b>Descripction:</b> {overview}</p>
  </div>
  <ul class="movie__data_list">
    <li class="movie__data_list__item">{vote_average}</li>
    <li class="movie__data_list__item">{stars}</li>
  </ul>
</article>
`;