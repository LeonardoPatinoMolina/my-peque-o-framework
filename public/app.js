"use strict";
import { Header } from "../src/pages/layout/header/Header.js";
import { Footer } from "../src/pages/layout/Footer.js";
import { Router } from "../src/pages/router.js";

//layout
const App = async () => {
  await Header.render();
  await Footer.render();

  await Router.init();
};

App();