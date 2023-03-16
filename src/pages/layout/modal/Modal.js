import {
  Component,
  TreeLayoutComponent,
  VolatileComponent,
} from "../../../lib/leoframe.js";
import { VolatileCardProps } from "../../../adapter/volatileCard.js";

export const resultsVolatileComponent =  new VolatileComponent({
  name: 'cardwrapper',
  templatePath: 'components/volatile/cards/',
  builder: async (component, treeProps)=>{
    component.children = [];
    // // const res = await fetch('https://jsonplaceholder.typicode.com/users')
    // const res = await fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${treeProps.query}&ts=1&apikey=5ab42191e80dab763b2eea835666ce40&hash=b91a1843f8d721b87e6d361cec1798a5`)
    // const dRes = await res.json();
    // const dataRes = dRes.data.results;
    
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=32458a9d6d90a2d065e4a80677a65409&language=es-ES&page=1');
    const rjson = await response.json()
    const moviesP = rjson.results;

    for (const data of moviesP) {
      const comp = new Component({
        name: 'card',
        templatePath: 'components/volatile/cards/',
        props: new VolatileCardProps(data).data
      })
      if(!component.children.find(co=>comp === co)){
        component.children.push(comp)
      }
    }
  }
})//end component;

const rulesScript = document.createElement('script');
rulesScript.src = 'src/pages/layout/modal/rules/index.js';
rulesScript.type = "module";
rulesScript.defer =  true;

export const Modal = new TreeLayoutComponent({
  name: "modal",
  globalProps: {query: 'spider'},
  rulesScript,
  children: [
    new Component({
      name: "modalsearch",
      templatePath: "components/layout/modal/",
      children: [
        new Component({
          name: "search",
          templatePath: "components/layout/modal/",
          props: { logo: "close", trigger: "close", disabled: "" },
        }),
        resultsVolatileComponent
      ],
    }),
  ],
});
// await fetch('https://jsonplaceholder.typicode.com/users')

//   volatileComp.update({
//     selector: '.modal_wrapper',
//     newProps: {
//       query: 'hola mundo'
//     }
// })