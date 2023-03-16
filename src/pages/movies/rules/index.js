import { Router } from "../../router.js";

  addEventListener("cardclick", ({ detail }) => {
    if(detail.dataset.type !== 'movie') return;
    
    // setTimeout(()=>{
      Router.jumpToTree("movie", {id: detail.id});
      // }, 100)
      window.scrollTo(0,0);
  });

