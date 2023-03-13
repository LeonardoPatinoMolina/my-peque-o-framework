import { TOP_RATED_TV,ON_AIR_TV,POPULAR_TV } from "../../../lib/tv_data.js";
import { Router } from "../../router.js";
import { ShowPropsPage } from "../../../adapter/showPage.js";

  addEventListener("cardclick", ({ detail }) => {
    if(detail.dataset.type !== 'show') return;
    let show;
    if(detail.dataset.filter === 'popular'){
      show = POPULAR_TV.find(m=>`${m.id}` === `${detail.id}`);
    }
    else if(detail.dataset.filter === 'rated'){
      show = TOP_RATED_TV.find(m=>`${m.id}` === `${detail.id}`);
    }
    else if(detail.dataset.filter === 'onair'){
      show = ON_AIR_TV.find(m=>`${m.id}` === `${detail.id}`);
    }
    Router.jumpToTree("show", new ShowPropsPage(show).data);
    window.scrollTo(0,0);
  });

