import {$} from '../../../lib/utils.js'
import { Router } from '../../../pages/router/router.js'

export const navbarRules = ()=>{

  const linkBtnHome = $('.link-home')
  const linkBtnMovies = $('.link-movies')

  linkBtnHome.addEventListener('click',()=>{
    Router.comeHome();
  })
  linkBtnMovies.addEventListener('click',()=>{
    Router.jumpToTree('movies')
  })

};