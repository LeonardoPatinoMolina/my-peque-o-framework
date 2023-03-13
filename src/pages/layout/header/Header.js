import { Component, TreeLayoutComponent } from '../../../lib/leoframe.js'

const rulesScript = document.createElement('script');
rulesScript.src = 'src/pages/layout/header/rules/index.js';
rulesScript.type = 'module';
rulesScript.defer = true;

export const Header = new TreeLayoutComponent({
  name: 'header',
  rulesScript,
  children: [
    new Component({
      props: {title: 'Movies'},
      name: "header",
      templatePath: 'components/layout/header/',
      rootNumber: false,
    }).build({
      parent: false,
      childBuilder: (parent) => {
        new Component({
          name: "search",
          templatePath: 'components/layout/header/',
          rootNumber: 1,
        }).build({ parent });
        new Component({
          name: "nav",
          templatePath: 'components/layout/header/',
          rootNumber: 2,
        }).build({ parent });
        new Component({
          name: 'subnav',
          templatePath: 'components/layout/header/',
          rootNumber: 3,
          props: {
            className: "subnav_movies",
            opction1: 'Popular',
            opction2: 'Mejores',
            opction3: 'Próximamente',
          },
        })
          .build({parent});
        new Component({
          name: 'subnav',
          templatePath: 'components/layout/header/',
          rootNumber: 4,
          props: {
            className: "subnav_series",
            opction1: 'Popular',
            opction2: 'Mejores',
            opction3: 'Al aire',
          },
        })
          .build({parent});
      },
    }),
  ],
});
