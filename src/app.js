"use strict";
import { Header } from "./pages/layout/header/Header.js";
import { Footer } from "./pages/layout/Footer.js";
import { Router } from "./pages/router.js";
import { Modal } from "./pages/layout/modal/Modal.js";

//layout
const App = async () => {
  await Modal.render();
  await Header.render();
  await Footer.render();

  await Router.init();
};

App();