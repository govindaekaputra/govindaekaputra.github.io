const urlBase64ToUnit8Array = base64String=>{
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
const showNotification = ()=>{
    navigator.serviceWorker.ready.then(()=>{
        if("PushManager" in window){
            navigator.serviceWorker.getRegistration().then(reg=>{
                reg.pushManager.subscribe({
                    userVisibleOnly : true,
                    applicationServerKey : urlBase64ToUnit8Array("BGdhTRykPnPMK5IU8qU5BeyL2h_MCVmYdPEbKhOzYs6J-qD_X0Dx-rcOTYzxQKwH5EwpeyByGrXOoX0hNUuVrac")
                }).then(subscribe=>{
                    console.log(subscribe.endpoint);
                    console.log(btoa(String.fromCharCode.apply(null,new Uint8Array(subscribe.getKey('p256dh')))));
                    console.log(btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))))
                }).catch(err=>{
                    console.log(err.message);
                })
            })
        }  
    })
}
const requestPermission = ()=>{
    Notification.requestPermission()
    .then(result=>{
        if(result == "denied"){
            console.log("tidak di izinkan user");
            return;
        }else if(result == "default"){
            console.log("user tidak memilih");
            return;
        }else if(result == "granted"){
            showNotification();
        }
    })
}

if("Notification" in window){
    requestPermission();
}else{
    console.log("Browser belum mendukung fitur notifikasi");
}