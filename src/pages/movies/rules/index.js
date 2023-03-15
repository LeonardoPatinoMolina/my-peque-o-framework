import { Router } from "../../router.js";

  addEventListener("cardclick", ({ detail }) => {
    if(detail.dataset.type !== 'movie') return;
    
    Router.jumpToTree("movie", {id: detail.id});
    window.scrollTo = (0,0);
  });

