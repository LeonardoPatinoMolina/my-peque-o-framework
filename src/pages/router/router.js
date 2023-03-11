import { Pagination } from "../../lib/leoframe.js"; 
import { Home } from "../home.page.js";
import { Movies } from "../movies.page.js";

export const Router = new Pagination({
  home: Home,
  pages: [
    Home,
    Movies
  ]
})