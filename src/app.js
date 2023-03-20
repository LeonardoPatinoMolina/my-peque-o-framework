"use strict";
import { Header } from "./pages/layout/header/Header.js";
import { Footer } from "./pages/layout/Footer.js";
import { Router } from "./pages/router.js";

//layout
const App = async () => {
  await Header.render();
  await Footer.render();

  await Router.init();
};

App();