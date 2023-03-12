function buildRoot(){
  let root = `<div class="root1"></div>`
  for(let i = 2; i < 21; i++){
    root += `<div class="root${i}"></div>`
  }
  return root
}

export const template = `
<section class="movies">
  ${buildRoot()}
</section>
`;

