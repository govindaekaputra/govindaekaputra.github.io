import * as API from "./api.js";
const loadPage = page=>{
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = ()=>{
        if(xhr.readyState === 4){
            const content = document.querySelector("#body-content");
            
            if(page=="home"){
                API.getTeams();
            }else if(page == "saved"){
                API.getSavedTeams();
            }else if(page == "standing"){
                API.getStandings();
            }

            if(xhr.status === 200){
                content.innerHTML = xhr.responseText;
            }else if(xhr.status === 404){
                content.innerHTML = "<p>halaman tidak ditemukan</p>"
            }else{
                content.innerHTML = "<p>ups.. halaman tidak dapat diakses</p>"
            }
        }
    }
    xhr.open("GET", `pages/${page}.html`, true);
    xhr.send();
}
export default loadPage;