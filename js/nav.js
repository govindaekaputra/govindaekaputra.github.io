import loadPage from "./page.js";
const loadNav = ()=>{
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4 && xhr.status === 200){

            document.querySelectorAll(".topnav, .sidenav").forEach(cur=>{
                cur.innerHTML = xhr.responseText;
            })

            document.querySelectorAll(".sidenav a, .topnav a").forEach(cur=>{
                cur.addEventListener("click",e=>{
                    const sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();
                    const page = e.target.getAttribute("href").substr(1);
                    console.log(page);
                    loadPage(page);
                })
            })
        }
    }
    xhr.open("GET", "nav.html" , true);
    xhr.send();
}
export default loadNav;