import loadNav from "./nav.js";
import loadPage from "./page.js";
document.addEventListener("DOMContentLoaded",()=>{
    const elems = document.querySelector(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    let page = window.location.hash.substr(1);
    if(page === "") page = "home";
    loadPage(page);
})