const base_url = "https://api.football-data.org/v2/";
const API_Token = "0af5c656ea394e2b875df7632692d714";

const status = response=>{
    if(response.status !== 200){
        console.log(`Error ${response.status}`);
        return Promise.reject(new Error(response.statusText));
    }else{
        return Promise.resolve(response);
    }
}

const json = response=>{
    return response.json();
}

const renderSquad = squad=>{
    let markup = "";
    squad.forEach(cur=>{
        markup +=`
        <tr>
            <td>${cur.name}</td>
            <td>${cur.position}</td>
            <td>${cur.nationality}</td>
        </tr>`;
    })
    return markup;
}

const renderTeam = data=>{
    let markup = "";
    const homeContent = document.querySelector("#home-content");
    const teamContent = document.querySelector("#team-content");
    const savedTeam = document.querySelector("#saved-team");
    const standingContent = document.querySelector("#standing-content");
    if(homeContent){
        data.teams.forEach(team=>{
            markup += `
            <div class="col s12 m6 l4">
                <div class="card" >
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${team.name} || ${team.tla}</span>
                        <p><em>Venue : ${team.venue}</em></p>
                        <p><em>email : ${(team.email != null)? team.email : "unkwon"}</em></p>
                        <p><a href="./team.html?id=${team.id}">Read more detail</a></p>
                    </div>
                </div>         
            </div>
            `;
        })
    }else if(standingContent){
        data.standings[0].table.forEach(team=>{
            markup += `
            <tr>
            <td>${team.position}</td>
            <td><img src=${team.team.crestUrl} width="50px" height="50px" alt="${team.team.name}'s image"></td>
            <td>${team.team.name}</td>
            <td>${team.playedGames}</td>
            <td>${team.won}</td>
            <td>${team.draw}</td>
            <td>${team.lost}</td>
            <td>${team.points}</td>
            <td>${team.goalsFor}</td>
            <td>${team.goalsAgainst}</td>
            <td>${team.goalDifference}</td>
          </tr>
            `;
        })
    }else if(teamContent){
        markup = `
        <div class="col s12 m6 l4">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator responsive-img" src="${data.crestUrl}" alt="${data.name}'s image" style="max-width:300px;margin:auto;">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${data.name}</span>
                    <p><a href=${data.website} target="_blank">visit the official website</a></p>
                    <p>Venue : ${data.venue}</p>
                    <h3>Squad : </h3>
                    <table class="hightlight responsive-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Nationality</th>
                        </tr>
                        </thead>

                        <tbody>${renderSquad(data.squad)}</tbody>
                    </table>
                </div>
            </div>         
        </div>
        `;
    }else if(savedTeam){
        data.forEach(team=>{
            markup += `
            <div class="col s12 m6 l4">
                <div class="card" >
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${team.name} || ${team.tla}</span>
                        <p><em>Venue : ${team.venue}</em></p>
                        <p><em>email : ${(team.email != null)? team.email : "unkwon"}</em></p>
                        <p><a href="./team.html?id=${team.id}&saved=true">Read more detail</a></p>
                        <a onclick=deleteTeam(${team.id}) class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
                    </div>
                </div>         
            </div>
            `;
        })
        
    }
    if(homeContent)
        homeContent.innerHTML = markup;
    if(teamContent)
        teamContent.innerHTML = markup;
    if(standingContent)
        standingContent.innerHTML = markup;
    if(savedTeam)
        savedTeam.innerHTML = markup;
}

const error = err=>{
    console.log(`Error ${err}`);
}


const getTeams = ()=>{
    if("caches" in window){
        caches.match(`${base_url}competitions/2021/teams`).then(response=>{
            if(response){
                response.json().then(renderTeam);
            }
        })
    }
    fetch(`${base_url}competitions/2021/teams`,{
        method: "GET",
        headers: {
            "X-Auth-Token" : API_Token
        }
    })
    .then(status)
    .then(json)
    .then(renderTeam)
    .catch(error);
}

const getTeamById = ()=>{
    return new Promise((resolve,reject)=>{
        const urlParams = new URLSearchParams(window.location.search);
        const idParams = urlParams.get("id");
        if("caches" in window){
            caches.match(`${base_url}teams/${idParams}`).then(response=>{
                if(response){
                    response.json().then(data=>{
                        renderTeam(data);
                        resolve(data);
                    })
                }
            })
        }
        fetch(`${base_url}teams/${idParams}`,{
            method : "GET",
            headers : {
                "X-Auth-Token" : API_Token
            }
        })
        .then(status)
        .then(json)
        .then(data=>{
            renderTeam(data);
            resolve(data);
        })
    })
    
}

const getStandings = ()=>{
    if("caches" in window){
        caches.match(`${base_url}competitions/2021/standings`).then(response=>{
            if(response){
                response.json().then(renderTeam);
            }
        })
    }
    fetch(`${base_url}competitions/2021/standings`,{
        method: "GET",
        headers: {
            "X-Auth-Token" : API_Token
        }
    })
    .then(status)
    .then(json)
    .then(renderTeam)
    .catch(error);
}

const getSavedTeams = ()=>{
    getAll().then(renderTeam);
}

const getSavedTeamById = ()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get("id");
    getById(idParams).then(renderTeam);
}

export {getTeams,getTeamById,getSavedTeams,getSavedTeamById,getStandings};