function setRoots(){
  let root = `<div class="root0"></div>`;
  for(let i = 1; i < 4; i++ ){
    root += `<div class="root${i}"></div>`;
  }
  return root;
}

const headerTemplate = `
<header class="header">
  <h1 class="header__title">{title}</h1>
  ${setRoots()}
</header>
`;

export default headerTemplate;