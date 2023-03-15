import { Router } from "../../router.js";

  addEventListener("cardclick", ({ detail }) => {
    if(detail.dataset.type !== 'show') return;

    Router.jumpToTree("show", {id: detail.id});
    window.scrollTo(0,0);
  });

