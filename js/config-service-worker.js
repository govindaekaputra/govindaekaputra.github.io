import * as API from "./api.js";
if("serviceWorker" in navigator){
    window.addEventListener("load",()=>{
        navigator.serviceWorker
        .register("../service-worker.js")
        .then(()=>{
            console.log("pendaftaran service worker berhasil");
        })
        .catch(()=>{
            console.log("pendaftaran service worker gagal");
        })
    })
}else{
    console.log("service worker belum didukung browser ini.");
}
document.addEventListener("DOMContentLoaded",()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get("id");
    const savedParams = urlParams.get("saved");
    
    if(savedParams){
        document.querySelector("#save").style.display = "none";
        API.getSavedTeamById();
    }
    
    if(idParams == null){
        API.getTeams();
    }else{
        const item = API.getTeamById();
        const save = document.querySelector("#save");
        item.then(article=>{
            save.addEventListener("click",()=>{
                saveForLater(article);
            })
        })
    }
})