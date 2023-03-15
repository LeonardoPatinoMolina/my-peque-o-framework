import {
  Component,
  TreeComponent,
  TreeLayoutComponent,
  VolatileComponent,
} from "../../../lib/leoframe.js";

export const Modal = new TreeComponent({
  name: "modal",
  children: [
    new VolatileComponent({
      name: "modalsearch",
      templatePath: "components/layout/modal/",
      children: [
        new VolatileComponent({
          name: "search",
          templatePath: "components/layout/modal/",
          props: { logo: "close", trigger: "close", disabled: "" },
        }),
        new VolatileComponent({
          name: 'cardwrapper',
          templatePath: 'components/volatile/cards/',
          builder: async (component)=>{
            for (let i = 0; i < 3; i++) {
              const comp = new Component({
                name: 'card',
                templatePath: 'components/volatile/cards/',
                props: {
                  title: 'jaja',
                  body: 'jojo'
                }
              })
              component.children.push(comp)
            }
          }
        })
      ],
    }),
  ],
});
// await fetch('https://jsonplaceholder.typicode.com/users')