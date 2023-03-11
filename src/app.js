"use strict";
import { Home } from "./pages/home.page.js";
import { Header } from "./pages/layout/Header.js"
import { Footer } from "./pages/layout/Footer.js"
import { componentsRules } from "./components/componentsRules.js";


//layout
const App = async ()=>{
  
  await Header.render()
  await Footer.render()

  await Home.render()
}



App().then(()=>{
  componentsRules();
})
