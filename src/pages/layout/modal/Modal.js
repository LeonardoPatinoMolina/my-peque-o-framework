import { TreeLayoutComponent } from "../../../lib/leoframe.js";
import { ModalSearchComponent } from "../../../components/layout/modal/modalsearch.template.js";
import { SearchComponent } from "../../../components/layout/modal/search.template.js";
import { VolatileCardWrapperComponent } from "../../../components/volatile/cards/cardwrapper_volatile.template.js";
import { modalBuilder } from "./modal.builder.js";
import { FiltersComponent } from "../../../components/layout/modal/filters.template.js";

export const ResultsCards = new VolatileCardWrapperComponent({builder: modalBuilder, key: 'resultscardsModal'});

export const FiltersComponent0 = new FiltersComponent({key: 'filterscomponent1'})

export const Modal = new TreeLayoutComponent({
  name: "modal",
  globalProps: {query: 'a'},
  children: [
    new ModalSearchComponent()
      .setChildren([
        new SearchComponent(),
        FiltersComponent0,
        ResultsCards
      ])
  ],
});

