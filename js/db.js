const dbPromise = idb.open("news-PLDB",1,upgradeDb=>{
    const articlesObjectStore = upgradeDb.createObjectStore("teams",{
        keyPath: "id"
    });
    articlesObjectStore.createIndex("name","name",{unique:false});
})

const saveForLater = team=>{
    dbPromise
    .then(db=>{
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
    })
    .then(()=>{
        M.toast({html: 'Successfully added to saved page',classes:"rounded"});
    })
}

const getAll = ()=>{
    return new Promise((resolve,reject)=>{
        dbPromise
        .then(db=>{
            const tx = db.transaction("teams","readonly");
            const store = tx.objectStore("teams");
            return store.getAll();
        })
        .then(teams=>{
            resolve(teams);
        })
    })
}

const getById = id=>{
    return new Promise((resolve,reject)=>{
        dbPromise
        .then(db=>{
            const tx = db.transaction("teams","readonly");
            const store = tx.objectStore("teams");
            return store.get(id);
        })
        .then(team=>{
            resolve(team);
        })
    })
}

const deleteTeam = id=>{
    dbPromise.then(db=>{
        const tx = db.transaction('teams', 'readwrite');
        const store = tx.objectStore('teams');
        store.delete(id);
        return tx.complete;
      }).then(()=>{
        M.toast({html: 'Successfully deleted',classes:"rounded"});
      });
}