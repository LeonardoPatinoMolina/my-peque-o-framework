import { POPULAR_MOVIES, TOP_RATED_MOVIES, UPCOMING_MOVIES } from "../../../lib/movies_data.js";
import { Router } from "../../router.js";
import { MoviePropsPage } from "../../../adapter/moviePage.js";

  addEventListener("cardclick", ({ detail }) => {
    console.log(detail.dataset);
    if(detail.dataset.type !== 'movie') return;
    console.log('movie click');
    let movie;
    if(detail.dataset.filter === 'popular'){
      movie = POPULAR_MOVIES.find(m=>`${m.id}` === `${detail.id}`);
    }
    else if(detail.dataset.filter === 'rated'){
      movie = TOP_RATED_MOVIES.find(m=>`${m.id}` === `${detail.id}`);
    }
    else if(detail.dataset.filter === 'upcoming'){
      movie = UPCOMING_MOVIES.find(m=>`${m.id}` === `${detail.id}`);
    }
    Router.jumpToTree("movie", new MoviePropsPage(movie).data);
  });

